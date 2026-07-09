import { type ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import styles from './Hero.module.css';

export interface HeroProps {
  image?: string;
  tag?: string;
  title: string;
  description?: string;
  href?: string;
  linkLabel?: string;
  rightSlot?: ReactNode;
}

export function Hero({ image, tag, title, description, href = '#', linkLabel = 'Ler notícia completa', rightSlot }: HeroProps) {
  return (
    <div className={styles.hero}>
      {image && <img className={styles.heroImage} src={image} alt="" />}
      <div className={styles.heroScrim} />
      <div className={styles.heroInner}>
        <div className={styles.heroContent}>
          {tag && <span className={styles.heroTag}>{tag}</span>}
          <h1 className={styles.heroTitle}>{title}</h1>
          {description && <p className={styles.heroDescription}>{description}</p>}
          <a className={styles.heroLink} href={href}>
            {linkLabel}
            <ArrowRight size={16} />
          </a>
        </div>
        {rightSlot && <div className={styles.heroPanel}>{rightSlot}</div>}
      </div>
    </div>
  );
}
