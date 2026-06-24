import React from 'react';
import styles from './Card.module.css';

export interface CardProps {
  children?: React.ReactNode;
  className?: string;
  variant?: 'default' | 'glass2';
}

export function Card({ children, className, variant = 'default' }: CardProps) {
  const base = variant === 'glass2' ? styles.card2 : styles.card;
  return (
    <div className={[base, className].filter(Boolean).join(' ')}>
      {children}
    </div>
  );
}
