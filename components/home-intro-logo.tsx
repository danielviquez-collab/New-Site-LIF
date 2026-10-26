'use client';
/* eslint-disable jsx-a11y/prefer-tag-over-role */

import { useLayoutEffect, useRef, useState } from 'react';
import { HOME_INTRO } from '@/lib/home-intro';
import { introPose } from '@/lib/intro-proposals';
import { lifLogoVector, lifLogoViewBox } from '@/lib/lif-logo-vector';

const parts = ['leaf', 'letterL', 'letterI', 'letterF', 'dot', 'laica'] as const;

export function HomeIntroLogo({ timeMs }: { timeMs: number }) {
  const dot = useRef<SVGGElement>(null);
  const [center, setCenter] = useState({ x: 502, y: 450 });

  useLayoutEffect(() => {
    const bounds = dot.current?.getBBox();
    if (bounds) {
      setCenter({
        x: bounds.x + bounds.width / 2,
        y: bounds.y + bounds.height / 2,
      });
    }
  }, []);

  const pose = introPose(HOME_INTRO, timeMs);
  const dotTransform = `translate(${pose.x} ${pose.y}) translate(${center.x} ${center.y}) rotate(${pose.rotation}) scale(${pose.sx} ${pose.sy}) translate(${-center.x} ${-center.y})`;

  return (
    <svg
      className="lif-approved-intro"
      viewBox={lifLogoViewBox}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="LIF, una marca de LAICA"
      style={{ transform: `scale(${pose.cameraScale})` }}
    >
      {parts.map((part, index) => (
        <g
          key={part}
          ref={part === 'dot' ? dot : undefined}
          data-part={part}
          opacity={
            part === 'dot'
              ? pose.opacity
              : part === 'leaf'
                ? pose.leafOpacity
                : part === 'laica'
                  ? pose.signatureOpacity
                  : pose.letterOpacity[index - 1]
          }
          transform={
            part === 'dot'
              ? dotTransform
              : part === 'leaf'
                ? `translate(0 ${pose.leafY})`
                : undefined
          }
        >
          {lifLogoVector[part].map((path, pathIndex) => (
            <path key={pathIndex} {...path} />
          ))}
        </g>
      ))}
    </svg>
  );
}
