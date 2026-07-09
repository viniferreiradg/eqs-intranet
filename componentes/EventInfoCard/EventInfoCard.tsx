import type { LucideIcon } from 'lucide-react';
import { ArrowRight, CalendarPlus } from 'lucide-react';
import styles from './EventInfoCard.module.css';

export interface EventInfoRow {
  icon: LucideIcon;
  label: string;
  lines: string[];
  strongFirstLine?: boolean;
}

export interface EventInfoCardProps {
  rows: EventInfoRow[];
  ctaLabel?: string;
  href?: string;
  calendarLabel?: string;
  calendarHref?: string;
}

export function EventInfoCard({
  rows,
  ctaLabel = 'Confirmar presença',
  href = '#',
  calendarLabel = 'Adicionar ao calendário',
  calendarHref = '#',
}: EventInfoCardProps) {
  return (
    <div className={styles.eventInfoCard}>
      {rows.map((row, i) => {
        const Icon = row.icon;
        return (
          <div className={styles.eventInfoRow} key={i}>
            <span className={styles.eventInfoIcon}><Icon size={18} /></span>
            <div className={styles.eventInfoText}>
              <span className={styles.eventInfoLabel}>{row.label}</span>
              {row.lines.map((line, j) => (
                <span
                  key={j}
                  className={j === 0 && row.strongFirstLine ? styles.eventInfoValueStrong : styles.eventInfoValue}
                >
                  {line}
                </span>
              ))}
            </div>
          </div>
        );
      })}
      <div className={styles.eventInfoActions}>
        <a className={styles.eventInfoCta} href={href}>
          {ctaLabel} <ArrowRight size={16} />
        </a>
        <a className={styles.eventInfoCalendarLink} href={calendarHref}>
          <CalendarPlus size={16} />
          {calendarLabel}
        </a>
      </div>
    </div>
  );
}
