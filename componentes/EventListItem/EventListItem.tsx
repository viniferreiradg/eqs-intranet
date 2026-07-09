import { MapPin } from 'lucide-react';
import styles from './EventListItem.module.css';

export interface EventListItemProps {
  day: string;
  month: string;
  title: string;
  location: string;
  href?: string;
}

export function EventListItem({ day, month, title, location, href = '#' }: EventListItemProps) {
  return (
    <a className={styles.eventListItem} href={href}>
      <div className={styles.eventListItemDate}>
        <span className={styles.eventListItemDay}>{day}</span>
        <span className={styles.eventListItemMonth}>{month}</span>
      </div>
      <div className={styles.eventListItemText}>
        <span className={styles.eventListItemTitle}>{title}</span>
        <span className={styles.eventListItemLocation}><MapPin size={12} />{location}</span>
      </div>
    </a>
  );
}
