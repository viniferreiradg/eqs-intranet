import type { LucideIcon } from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import styles from './AboutHero.module.css';

export interface AboutHeroStat {
  icon: LucideIcon;
  value: string;
  label: string;
}

export interface AboutHeroProps {
  kicker: string;
  title: string;
  description: string;
  ctaLabel?: string;
  href?: string;
  image: string;
  stats: AboutHeroStat[];
}

export function AboutHero({ kicker, title, description, ctaLabel, href = '#', image, stats }: AboutHeroProps) {
  return (
    <div className={styles.aboutHero}>
      <div className={styles.aboutHeroContent}>
        <span className={styles.aboutHeroKicker}>{kicker}</span>
        <h1 className={styles.aboutHeroTitle}>{title}</h1>
        <p className={styles.aboutHeroDescription}>{description}</p>
        {ctaLabel && (
          <a className={styles.aboutHeroCta} href={href}>
            {ctaLabel} <ArrowRight size={16} />
          </a>
        )}
      </div>

      <div className={styles.aboutHeroMedia}>
        <img className={styles.aboutHeroImage} src={image} alt="" />
        <div className={styles.aboutHeroStats}>
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div className={styles.aboutHeroStat} key={stat.label}>
                <span className={styles.aboutHeroStatIcon}><Icon size={22} /></span>
                <span className={styles.aboutHeroStatValue}>{stat.value}</span>
                <span className={styles.aboutHeroStatLabel}>{stat.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
