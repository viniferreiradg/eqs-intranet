import React from 'react';
import styles from './Background.module.css';

interface BackgroundProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function Background({ children, className, style }: BackgroundProps) {
  return (
    <div className={[styles.bgWrapper, className].filter(Boolean).join(' ')} style={style}>
      <div className={styles.blob1} />
      <div className={styles.blob2} />
      {children}
    </div>
  );
}
