import { type LucideIcon, ArrowRight } from 'lucide-react';
import styles from './EventHighlightCard.module.css';

export interface EventHighlightMeta {
  icon: LucideIcon;
  label: string;
}

export interface EventHighlightCardProps {
  image?: string;
  kicker?: string;
  heading?: string;
  day?: string;
  month?: string;
  title: string;
  meta: EventHighlightMeta[];
  description?: string;
  ctaLabel?: string;
  href?: string;
  /** 'panel' (default) — usado na Home, painel branco flutuante sobre a foto.
   *  'wide' — banner full-width (página de listagem de Eventos), texto direto sobre a foto. */
  variant?: 'panel' | 'wide';
  secondaryCtaLabel?: string;
  secondaryHref?: string;
}

export function EventHighlightCard({
  image,
  kicker = 'Agenda',
  heading = 'Próximo Evento',
  day,
  month,
  title,
  meta,
  description,
  ctaLabel = 'Confirmar presença',
  href = '#',
  variant = 'panel',
  secondaryCtaLabel,
  secondaryHref = '#',
}: EventHighlightCardProps) {
  if (variant === 'wide') {
    return (
      <div className={`${styles.eventHighlightCard} ${styles.eventHighlightCardWide}`}>
        {image && <img className={styles.eventHighlightImage} src={image} alt="" />}
        <div className={styles.eventHighlightScrim} />
        <div className={styles.eventHighlightWideContent}>
          <span className={styles.eventHighlightKicker}>{kicker}</span>
          <h3 className={styles.eventHighlightWideTitle}>{title}</h3>
          {description && <p className={styles.eventHighlightWideDescription}>{description}</p>}
          <div className={styles.eventHighlightMeta}>
            {meta.map((item) => {
              const Icon = item.icon;
              return (
                <span className={styles.eventHighlightMetaItem} key={item.label}>
                  <Icon size={14} />{item.label}
                </span>
              );
            })}
          </div>
          <div className={styles.eventHighlightWideActions}>
            <a className={styles.eventHighlightCta} href={href}>
              {ctaLabel}
              <ArrowRight size={16} />
            </a>
            {secondaryCtaLabel && (
              <a className={styles.eventHighlightSecondaryCta} href={secondaryHref}>
                {secondaryCtaLabel}
                <ArrowRight size={16} />
              </a>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.eventHighlightCard}>
      {image && <img className={styles.eventHighlightImage} src={image} alt="" />}
      <div className={styles.eventHighlightScrim} />
      <div className={styles.eventHighlightOverlay}>
        <span className={styles.eventHighlightKicker}>{kicker}</span>
        <h3 className={styles.eventHighlightHeading}>{heading}</h3>
      </div>
      <div className={styles.eventHighlightPanel}>
        <div className={styles.eventHighlightDateBadge}>
          <span className={styles.eventHighlightDay}>{day}</span>
          <span className={styles.eventHighlightMonth}>{month}</span>
        </div>
        <div className={styles.eventHighlightPanelBody}>
          <h4 className={styles.eventHighlightTitle}>{title}</h4>
          <div className={styles.eventHighlightMeta}>
            {meta.map((item) => {
              const Icon = item.icon;
              return (
                <span className={styles.eventHighlightMetaItem} key={item.label}>
                  <Icon size={14} />{item.label}
                </span>
              );
            })}
          </div>
          {description && <p className={styles.eventHighlightDescription}>{description}</p>}
          <a className={styles.eventHighlightCta} href={href}>
            {ctaLabel}
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}
