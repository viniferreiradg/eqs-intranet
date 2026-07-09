import styles from './NewsCard.module.css';

export interface NewsCardProps {
  image?: string;
  tag?: string;
  tagStatus?: 'success' | 'info' | 'warning' | 'error' | 'disabled';
  title: string;
  excerpt?: string;
  date?: string;
  href?: string;
}

export function NewsCard({ image, tag, tagStatus = 'info', title, excerpt, date, href = '#' }: NewsCardProps) {
  return (
    <a className={styles.newsCard} href={href}>
      <div className={styles.newsImageWrap}>
        {image && <img className={styles.newsImage} src={image} alt="" />}
        {tag && <span className={styles.newsTag} data-status={tagStatus}>{tag}</span>}
      </div>
      <div className={styles.newsBody}>
        <h3 className={styles.newsTitle}>{title}</h3>
        {excerpt && <p className={styles.newsExcerpt}>{excerpt}</p>}
        {date && <span className={styles.newsDate}>{date}</span>}
      </div>
    </a>
  );
}
