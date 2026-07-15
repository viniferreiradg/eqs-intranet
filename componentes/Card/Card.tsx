import React from 'react';
import styles from './Card.module.css';

export interface CardProps {
  children?: React.ReactNode;
  className?: string;
  variant?: 'default' | 'elevated';
}

export function Card({ children, className, variant = 'default' }: CardProps) {
  const base = variant === 'elevated' ? styles.card2 : styles.card;
  return (
    <div className={[base, className].filter(Boolean).join(' ')}>
      {children}
    </div>
  );
}
