import { type LucideIcon, ArrowRight } from 'lucide-react';
import styles from './StatsBanner.module.css';

export interface StatsBannerStat {
  icon: LucideIcon;
  value: string;
  label: string;
}

export interface StatsBannerProps {
  image?: string;
  kicker?: string;
  title: string;
  description?: string;
  stats?: StatsBannerStat[];
  ctaLabel?: string;
  href?: string;
}

export function StatsBanner({ image, kicker = 'Institucional', title, description, stats, ctaLabel = 'Saiba mais', href = '#' }: StatsBannerProps) {
  return (
    <div className={styles.statsBanner}>
      {image && <img className={styles.statsBannerImage} src={image} alt="" />}
      <div className={styles.statsBannerScrim} />
      <div className={styles.statsBannerInner}>
        <div className={styles.statsBannerTop}>
          <div className={styles.statsBannerContent}>
            <span className={styles.statsBannerKicker}>{kicker}</span>
            <h2 className={styles.statsBannerTitle}>{title}</h2>
            {description && <p className={styles.statsBannerDescription}>{description}</p>}
          </div>
          <a className={styles.statsBannerCta} href={href}>
            {ctaLabel}
            <ArrowRight size={16} />
          </a>
        </div>
        {stats && stats.length > 0 && (
          <div className={styles.statsBannerStats}>
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div className={styles.statsBannerStat} key={stat.label}>
                  <span className={styles.statsBannerStatIcon}><Icon size={28} /></span>
                  <div className={styles.statsBannerStatText}>
                    <span className={styles.statsBannerStatValue}>{stat.value}</span>
                    <span className={styles.statsBannerStatLabel}>{stat.label}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
