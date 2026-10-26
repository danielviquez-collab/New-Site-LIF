'use client';

import { createContext, useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { ArrowRight, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import Link from './static-link';
import { HomeIntroLogo } from './home-intro-logo';
import { HOME_INTRO, HOME_INTRO_AUDIO, HOME_INTRO_TRAVEL_MS } from '@/lib/home-intro';
import { IntroProposalAudio } from '@/lib/intro-proposal-audio';

export const EntranceContext = createContext(false);

export function HomeEntrance({ children, preview = false }: { children: ReactNode; preview?: boolean }) {
  const [phase, setPhase] = useState<'pending' | 'playing' | 'departing' | 'done'>('pending');
  const [iteration, setIteration] = useState(0);
  const [timeMs, setTimeMs] = useState(0);
  const [hydrated, setHydrated] = useState(false);
  const [travel, setTravel] = useState<CSSProperties>({});
  const [audioActive, setAudioActive] = useState(false);
  const [soundBlocked, setSoundBlocked] = useState(false);
  const [player] = useState(() => new IntroProposalAudio());
  const homeRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<number | null>(null);
  const frameRef = useRef<number | null>(null);
  const playbackId = useRef(0);
  const focusRef = useRef<HTMLElement | null>(null);
  const manualReplay = useRef(false);

  const cancelPlayback = useCallback(() => {
    playbackId.current += 1;
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
    timerRef.current = null;
    frameRef.current = null;
    player.stop();
  }, [player]);

  const finish = useCallback((restoreFocus = false) => {
    const active = document.activeElement;
    const overlay = overlayRef.current;
    const usedControl = active !== overlay && !!active && !!overlay?.contains(active);
    const returnFocus = restoreFocus || manualReplay.current || usedControl;
    // Automatic playback must not give a navigation link a keyboard focus ring.
    if (active === overlay && !returnFocus) overlay?.blur();
    cancelPlayback();
    setAudioActive(false);
    setPhase('done');
    if (returnFocus) {
      window.requestAnimationFrame(() => {
        const previous = focusRef.current;
        const target = previous?.isConnected && previous !== document.body && previous !== document.documentElement
          ? previous
          : homeRef.current?.parentElement?.querySelector<HTMLElement>('.intro-home-sound, .brand-lockup');
        target?.focus({ preventScroll: true });
      });
    }
  }, [cancelPlayback]);

  const depart = useCallback(() => {
    if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
    frameRef.current = null;
    player.stop();
    setAudioActive(false);
    setTimeMs(HOME_INTRO.durationMs);
    setPhase('departing');
    timerRef.current = window.setTimeout(finish, HOME_INTRO_TRAVEL_MS);
  }, [finish, player]);

  const start = useCallback(async (withSound: boolean) => {
    cancelPlayback();
    const id = playbackId.current;
    manualReplay.current = withSound;
    if (document.hidden || window.matchMedia('(prefers-reduced-motion: reduce)').matches) { finish(); return; }
    focusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    window.scrollTo({ top: 0, behavior: 'instant' });
    const target = homeRef.current?.querySelector<HTMLImageElement>('.brand-lockup img');
    const bounds = target?.getBoundingClientRect();
    const width = Math.min(440, window.innerWidth * .82);
    if (target && bounds) {
      setTravel({
        '--logo-travel-x': `${bounds.left + bounds.width / 2 - window.innerWidth / 2}px`,
        '--logo-travel-y': `${bounds.top + bounds.height / 2 - window.innerHeight / 2}px`,
        '--logo-travel-scale': Math.min(target.offsetWidth, target.offsetHeight * 956 / 600) / width,
        '--logo-travel-duration': `${HOME_INTRO_TRAVEL_MS}ms`,
      } as CSSProperties);
    }
    setIteration((value) => value + 1);
    setPhase('pending');
    setTimeMs(0);
    setAudioActive(false);
    setSoundBlocked(false);
    let muted = false;
    try {
      if (withSound) sessionStorage.removeItem('lif-intro-muted');
      else muted = sessionStorage.getItem('lif-intro-muted') === 'true';
    } catch { /* Audio preferences remain optional when storage is unavailable. */ }

    let audible = false;
    if (!muted) {
      // Match the comparator's audible-output clock when playback is allowed.
      // A blocked or slow autoplay falls back promptly to the same silent motion.
      let preparationTimer: number | undefined;
      try {
        player.setVolume(.7);
        const prepared = await Promise.race([
          player.play(HOME_INTRO_AUDIO),
          new Promise<boolean>((resolve) => { preparationTimer = window.setTimeout(() => resolve(false), 250); }),
        ]);
        if (id !== playbackId.current) return;
        audible = prepared;
        if (!audible) player.stop();
      } catch {
        if (id !== playbackId.current) return;
        player.stop();
      } finally {
        if (preparationTimer !== undefined) window.clearTimeout(preparationTimer);
      }
      setSoundBlocked(!audible);
    }
    if (id !== playbackId.current) return;
    setAudioActive(audible);
    setPhase('playing');
    let silentOrigin = performance.now();
    const visualStart = silentOrigin;
    function draw() {
      if (id !== playbackId.current) return;
      const now = performance.now();
      let ms = audible ? player.timeMs() : now - silentOrigin;
      if (audible && now - visualStart - ms > 250) {
        // A suspended output must not leave the visitor behind the welcome.
        audible = false;
        silentOrigin = now - ms;
        player.stop();
        setAudioActive(false);
        setSoundBlocked(true);
      }
      ms = Math.min(HOME_INTRO.durationMs, ms);
      setTimeMs(ms);
      if (ms >= HOME_INTRO.durationMs - .5) depart();
      else frameRef.current = window.requestAnimationFrame(draw);
    }
    frameRef.current = window.requestAnimationFrame(draw);
  }, [cancelPlayback, depart, finish, player]);

  function silence() {
    // Keep the running output clock so muting never shifts the choreography.
    player.setVolume(0);
    setAudioActive(false);
    try { sessionStorage.setItem('lif-intro-muted', 'true'); } catch { /* Keep the current visit muted. */ }
  }

  useEffect(() => {
    if (phase === 'playing') overlayRef.current?.focus({ preventScroll: true });
  }, [phase]);

  useEffect(() => {
    setHydrated(true);
    timerRef.current = window.setTimeout(() => {
      if (!preview && document.documentElement.dataset.homeEntry === 'content') finish();
      else void start(false);
    }, 0);
    const onVisibility = () => { if (document.hidden) finish(); };
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onMotion = () => { if (motion.matches) finish(); };
    document.addEventListener('visibilitychange', onVisibility);
    motion.addEventListener('change', onMotion);
    return () => {
      cancelPlayback();
      player.dispose();
      document.removeEventListener('visibilitychange', onVisibility);
      motion.removeEventListener('change', onMotion);
    };
  }, [cancelPlayback, finish, player, preview, start]);

  const soundLabel = audioActive ? 'Silenciar bienvenida' : 'Repetir bienvenida con sonido';
  return (
    <EntranceContext.Provider value={phase !== 'done'}>
    <div className={`home-entrance${phase !== 'done' ? ' is-entering' : ''}`} data-intro-state={phase} data-intro-proposal={HOME_INTRO.id} data-intro-time={timeMs.toFixed(2)} data-intro-audio={audioActive ? 'playing' : 'silent'}>
      <link rel="preload" as="fetch" href={HOME_INTRO_AUDIO} crossOrigin="anonymous" />
      <div className="entrance-home" ref={homeRef} inert={hydrated && phase !== 'done' || undefined}>{children}</div>
      {phase !== 'done' && (
        <div className={`logo-entry-overlay${phase === 'pending' ? ' is-waiting' : ''}${phase === 'departing' ? ' is-departing' : ''}`} key={iteration} ref={overlayRef} style={travel} role="region" aria-label="Bienvenida a LIF" tabIndex={-1} onKeyDown={(event) => { if (event.key === 'Escape') finish(true); }}>
          <div className="logo-entry-traveler"><HomeIntroLogo timeMs={timeMs} /></div>
          <div className="intro-overlay-controls">
            <button type="button" className="intro-sound" title={soundLabel} aria-label={soundLabel} onClick={() => {
              if (audioActive) silence();
              else void start(true);
            }}>{audioActive ? <Volume2 aria-hidden="true" /> : <VolumeX aria-hidden="true" />}</button>
            <button type="button" className="intro-skip" onClick={() => finish(true)}>Entrar <ArrowRight aria-hidden="true" /></button>
          </div>
        </div>
      )}
      {preview && phase === 'done' && (
        <button type="button" className="intro-sound intro-home-sound" title={soundLabel} aria-label={soundLabel} data-sound-blocked={soundBlocked || undefined} onClick={() => {
          if (audioActive) silence();
          else void start(true);
        }}>{audioActive || !soundBlocked ? <Volume2 aria-hidden="true" /> : <VolumeX aria-hidden="true" />}</button>
      )}
      {preview && phase === 'done' && <div className="motion-review-controls">
        <button type="button" onClick={() => { void start(true); }}><RotateCcw aria-hidden="true" /> Repetir con sonido</button>
        <a href="/brand/lif-official.svg" target="_blank" rel="noreferrer">Logo original</a>
        <Link href="/">Ver sitio <ArrowRight aria-hidden="true" /></Link>
      </div>}
      <noscript><style>{'.logo-entry-overlay,.intro-home-sound{display:none!important}.entrance-home{opacity:1!important}'}</style></noscript>
    </div>
    </EntranceContext.Provider>
  );
}
