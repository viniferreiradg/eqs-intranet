import { ArrowRight } from 'lucide-react';
import styles from './ContentSplit.module.css';

export interface ContentSplitProps {
  image: string;
  imagePosition?: 'left' | 'right';
  kicker: string;
  title: string;
  paragraphs: string[];
  ctaLabel?: string;
  href?: string;
}

export function ContentSplit({
  image,
  imagePosition = 'left',
  kicker,
  title,
  paragraphs,
  ctaLabel,
  href = '#',
}: ContentSplitProps) {
  return (
    <div className={[styles.contentSplit, imagePosition === 'right' ? styles.contentSplitImageRight : ''].join(' ')}>
      <img className={styles.contentSplitImage} src={image} alt="" />
      <div className={styles.contentSplitText}>
        <span className={styles.contentSplitKicker}>{kicker}</span>
        <h2 className={styles.contentSplitTitle}>{title}</h2>
        {paragraphs.map((p, i) => (
          <p className={styles.contentSplitParagraph} key={i}>{p}</p>
        ))}
        {ctaLabel && (
          <a className={styles.contentSplitCta} href={href}>
            {ctaLabel} <ArrowRight size={16} />
          </a>
        )}
      </div>
    </div>
  );
}
