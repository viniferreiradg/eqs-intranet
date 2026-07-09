import { MapPin } from 'lucide-react';
import styles from './EventCard.module.css';

export interface EventCardProps {
  image?: string;
  day: string;
  month: string;
  title: string;
  location: string;
  href?: string;
}

export function EventCard({ image, day, month, title, location, href = '#' }: EventCardProps) {
  return (
    <a className={styles.eventCard} href={href}>
      <div className={styles.eventImageWrap}>
        {image && <img className={styles.eventImage} src={image} alt="" />}
        <div className={styles.eventDateBadge}>
          <span className={styles.eventDay}>{day}</span>
          <span className={styles.eventMonth}>{month}</span>
        </div>
      </div>
      <div className={styles.eventBody}>
        <h3 className={styles.eventTitle}>{title}</h3>
        <span className={styles.eventLocation}><MapPin size={14} />{location}</span>
      </div>
    </a>
  );
}
