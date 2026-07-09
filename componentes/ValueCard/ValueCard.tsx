import type { LucideIcon } from 'lucide-react';
import styles from './ValueCard.module.css';

export interface ValueCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function ValueCard({ icon: Icon, title, description }: ValueCardProps) {
  return (
    <div className={styles.valueCard}>
      <span className={styles.valueIcon}><Icon size={24} /></span>
      <h3 className={styles.valueTitle}>{title}</h3>
      <p className={styles.valueDescription}>{description}</p>
    </div>
  );
}
