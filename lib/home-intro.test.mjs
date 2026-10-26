import test from 'node:test';
import assert from 'node:assert/strict';
import {
  HOME_INTRO,
  HOME_INTRO_AUDIO,
  HOME_INTRO_TRAVEL_MS,
} from './home-intro.ts';
import { introPose } from './intro-proposals.ts';

test('The approved welcome uses Hielo fluido and preserves its five audible accents', () => {
  assert.equal(HOME_INTRO.id, 'ice4');
  assert.equal(HOME_INTRO.source, 'Ice Water Shift Tall Glass 4');
  assert.equal(HOME_INTRO.durationMs, 2612.25);
  assert.equal(HOME_INTRO_AUDIO, '/audio/lif-welcome-ice4.wav');
  assert.equal(HOME_INTRO_TRAVEL_MS, 520);
  assert.deepEqual(HOME_INTRO.cues, [185, 405, 1345, 1545, 1725]);
  const accents = [
    [185, 275, -65, 125, 0.95, 1.06],
    [405, 200, 35, 90, 1.13, 0.86],
    [1345, 0, 0, 0, 1.12, 0.86],
    [1545, 0, 0, 0, 1.06, 0.94],
    [1725, 0, 0, 0, 1.025, 0.975],
  ];
  for (const [time, ...expected] of accents) {
    const pose = introPose(HOME_INTRO, time);
    assert.deepEqual(
      [pose.x, pose.y, pose.rotation, pose.sx, pose.sy],
      expected,
    );
  }
});

test('The full welcome duration allows the LAICA signature to arrive before travel', () => {
  assert.equal(introPose(HOME_INTRO, 1950).signatureOpacity, 0);
  assert.equal(introPose(HOME_INTRO, 2172.25).signatureOpacity, 0);
  assert.equal(introPose(HOME_INTRO, 2412.25).signatureOpacity, 1);
  const final = introPose(HOME_INTRO, HOME_INTRO.durationMs);
  assert.deepEqual(final, {
    x: 0,
    y: 0,
    rotation: 0,
    sx: 1,
    sy: 1,
    opacity: 1,
    leafOpacity: 1,
    leafY: 0,
    letterOpacity: [1, 1, 1],
    signatureOpacity: 1,
    cameraScale: 1,
  });
  assert.deepEqual(introPose(HOME_INTRO, HOME_INTRO.durationMs + 520), final);
});
