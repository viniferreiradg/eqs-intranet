import { type LucideIcon } from 'lucide-react';
import cardStyles from '../Card/Card.module.css';
import styles from './LinkCard.module.css';

export interface LinkCardProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  href?: string;
}

export function LinkCard({ icon: Icon, title, description, href = '#' }: LinkCardProps) {
  return (
    <a className={[cardStyles.card, styles.linkCard].join(' ')} href={href}>
      <span className={styles.linkIcon}><Icon size={20} /></span>
      <h3 className={styles.linkTitle}>{title}</h3>
      {description && <p className={styles.linkDescription}>{description}</p>}
    </a>
  );
}
