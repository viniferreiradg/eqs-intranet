import { type LucideIcon } from 'lucide-react';
import styles from './EventRow.module.css';

export interface EventRowMeta {
  icon: LucideIcon;
  label: string;
}

export interface EventRowProps {
  image?: string;
  day: string;
  month: string;
  tag: string;
  tagStatus?: 'success' | 'info' | 'warning' | 'error' | 'disabled';
  title: string;
  meta: EventRowMeta[];
  description?: string;
  ctaLabel?: string;
  href?: string;
}

export function EventRow({
  image,
  day,
  month,
  tag,
  tagStatus = 'info',
  title,
  meta,
  description,
  ctaLabel = 'Confirmar presença',
  href = '#',
}: EventRowProps) {
  return (
    <div className={styles.eventRow}>
      <div className={styles.eventRowDate}>
        <span className={styles.eventRowDay}>{day}</span>
        <span className={styles.eventRowMonth}>{month}</span>
      </div>

      {image && (
        <div className={styles.eventRowImageWrap}>
          <img className={styles.eventRowImage} src={image} alt="" />
        </div>
      )}

      <div className={styles.eventRowContent}>
        <span className={styles.eventRowTag} data-status={tagStatus}>{tag}</span>
        <h3 className={styles.eventRowTitle}>{title}</h3>
        <div className={styles.eventRowMeta}>
          {meta.map((item) => {
            const Icon = item.icon;
            return (
              <span className={styles.eventRowMetaItem} key={item.label}>
                <Icon size={14} />{item.label}
              </span>
            );
          })}
        </div>
        {description && <p className={styles.eventRowDescription}>{description}</p>}
      </div>

      <a className={styles.eventRowCta} href={href}>{ctaLabel}</a>
    </div>
  );
}
