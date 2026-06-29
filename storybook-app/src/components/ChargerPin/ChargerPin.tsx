import React from 'react';
import styles from './ChargerPin.module.css';

export type ChargerStatus = 'available' | 'occupied';

export interface ChargerPinProps {
  chargers: ChargerStatus[];
  size?: number;
  className?: string;
  'aria-label'?: string;
}

export function ChargerPin({
  chargers,
  size = 56,
  className,
  'aria-label': ariaLabel,
}: ChargerPinProps) {
  const cx     = size / 2;
  const cy     = size / 2;
  const sw     = size * 0.10;
  const rOuter = size / 2 - 1;
  const rRing  = rOuter - sw / 2;
  const C      = 2 * Math.PI * rRing;
  const N      = chargers.length;
  const GAP    = N === 1 ? 0 : 4;
  const segLen = C * ((360 / N) - GAP) / 360;

  const available = chargers.filter(s => s === 'available').length;
  const occupied  = chargers.filter(s => s === 'occupied').length;
  const autoLabel = ariaLabel ?? `Posto com ${N} carregador${N > 1 ? 'es' : ''}: ${available} livre${available !== 1 ? 's' : ''}, ${occupied} ocupado${occupied !== 1 ? 's' : ''}`;

  return (
    <svg
      className={[styles.chargerPin, className].filter(Boolean).join(' ')}
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      role="img"
      aria-label={autoLabel}
    >
      <circle cx={cx} cy={cy} r={rOuter} className={styles.bg} />

      {chargers.map((status, i) => {
        const rot = -90 + i * (360 / N) + GAP / 2;
        return (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={rRing}
            fill="none"
            strokeWidth={sw}
            strokeLinecap="butt"
            strokeDasharray={`${segLen.toFixed(2)} ${C.toFixed(2)}`}
            transform={`rotate(${rot.toFixed(2)}, ${cx}, ${cy})`}
            className={status === 'available' ? styles.arcAvailable : styles.arcOccupied}
          />
        );
      })}

      <text
        x={cx}
        y={cy}
        textAnchor="middle"
        dominantBaseline="central"
        className={styles.label}
        fontSize={size * 0.38}
      >
        {N}
      </text>
    </svg>
  );
}
