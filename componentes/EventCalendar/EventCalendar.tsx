import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './EventCalendar.module.css';

export interface EventCalendarProps {
  monthLabel: string;
  weekdays?: string[];
  days: (number | null)[];
  highlightDays?: number[];
  footerLabel?: string;
  footerHref?: string;
}

const defaultWeekdays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

export function EventCalendar({
  monthLabel,
  weekdays = defaultWeekdays,
  days,
  highlightDays = [],
  footerLabel = 'Ver todos os eventos',
  footerHref = '#',
}: EventCalendarProps) {
  return (
    <div className={styles.eventCalendar}>
      <div className={styles.eventCalendarHeader}>
        <h3 className={styles.eventCalendarMonth}>{monthLabel}</h3>
        <div className={styles.eventCalendarNav}>
          <button className={styles.eventCalendarNavBtn} type="button" aria-label="Mês anterior">
            <ChevronLeft size={16} />
          </button>
          <button className={styles.eventCalendarNavBtn} type="button" aria-label="Próximo mês">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className={styles.eventCalendarWeekdays}>
        {weekdays.map((w) => (
          <span className={styles.eventCalendarWeekday} key={w}>{w}</span>
        ))}
      </div>

      <div className={styles.eventCalendarGrid}>
        {days.map((d, i) => (
          d === null
            ? <span className={styles.eventCalendarCellEmpty} key={i} />
            : (
              <span
                className={highlightDays.includes(d) ? `${styles.eventCalendarCell} ${styles.eventCalendarCellActive}` : styles.eventCalendarCell}
                key={i}
              >
                {d}
              </span>
            )
        ))}
      </div>

      <a className={styles.eventCalendarFooter} href={footerHref}>
        {footerLabel}
        <ChevronRight size={16} />
      </a>
    </div>
  );
}
