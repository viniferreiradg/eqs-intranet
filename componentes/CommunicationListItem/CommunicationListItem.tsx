import { type LucideIcon, ChevronRight } from 'lucide-react';
import styles from './CommunicationListItem.module.css';

export interface CommunicationListItemProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  date?: string;
  href?: string;
}

export function CommunicationListItem({ icon: Icon, title, description, date, href = '#' }: CommunicationListItemProps) {
  return (
    <a className={styles.commListItem} href={href}>
      <span className={styles.commListItemIcon}><Icon size={18} /></span>
      <span className={styles.commListItemText}>
        <span className={styles.commListItemTitle}>{title}</span>
        {description && <span className={styles.commListItemDescription}>{description}</span>}
      </span>
      <span className={styles.commListItemMeta}>
        {date && <span className={styles.commListItemDate}>{date}</span>}
        <ChevronRight className={styles.commListItemChevron} size={16} />
      </span>
    </a>
  );
}
