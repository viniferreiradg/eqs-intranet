import { HTMLAttributes } from 'react';
import styles from './Logo.module.css';

export interface LogoProps extends HTMLAttributes<HTMLSpanElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  width?: number | string;
}

const SIZE_MAP = {
  sm: 80,
  md: 160,
  lg: 240,
  xl: 360,
};

const SIZE_CLASS = {
  sm: styles.logoSm,
  md: styles.logoMd,
  lg: styles.logoLg,
  xl: styles.logoXl,
};

export function LogoSymbol({ size = 'md', width, className, style, ...props }: LogoProps) {
  return (
    <span
      className={[styles.logoSymbol, SIZE_CLASS[size], className].filter(Boolean).join(' ')}
      style={{ width, ...style }}
      role="img"
      aria-label="EQS Engenharia"
      {...props}
    />
  );
}

export function Logo({ size = 'md', width, className, style, ...props }: LogoProps) {
  const resolvedWidth = width ?? SIZE_MAP[size];

  return (
    <span
      className={[styles.logoDefault, className].filter(Boolean).join(' ')}
      style={{ width: resolvedWidth, ...style }}
      role="img"
      aria-label="EQS Engenharia"
      {...props}
    />
  );
}
