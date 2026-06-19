import React from 'react';
import styles from './Background.module.css';

interface BackgroundProps {
  children?: React.ReactNode;
  className?: string;
}

export function Background({ children, className }: BackgroundProps) {
  return (
    <div className={[styles.bgWrapper, className].filter(Boolean).join(' ')}>
      {children}
    </div>
  );
}
