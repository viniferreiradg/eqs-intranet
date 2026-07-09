import styles from './EventScheduleItem.module.css';

export interface EventScheduleItemProps {
  time: string;
  title: string;
  description?: string;
}

export function EventScheduleItem({ time, title, description }: EventScheduleItemProps) {
  return (
    <div className={styles.eventScheduleItem}>
      <div className={styles.eventScheduleVis}>
        <span className={styles.eventScheduleDot} />
        <span className={styles.eventScheduleConnector} />
      </div>
      <div className={styles.eventScheduleContent}>
        <div className={styles.eventScheduleHeader}>
          <span className={styles.eventScheduleTime}>{time}</span>
          <span className={styles.eventScheduleTitle}>{title}</span>
        </div>
        {description && <p className={styles.eventScheduleDescription}>{description}</p>}
      </div>
    </div>
  );
}
