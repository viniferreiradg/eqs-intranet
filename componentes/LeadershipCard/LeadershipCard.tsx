import cardStyles from '../Card/Card.module.css';
import styles from './LeadershipCard.module.css';

export interface LeadershipCardProps {
  photo: string;
  name: string;
  role: string;
  linkedinHref?: string;
}

export function LeadershipCard({ photo, name, role, linkedinHref }: LeadershipCardProps) {
  return (
    <div className={[cardStyles.card, styles.leadershipCard].join(' ')}>
      <img className={styles.leadershipPhoto} src={photo} alt={name} />
      <div className={styles.leadershipBody}>
        <div className={styles.leadershipText}>
          <span className={styles.leadershipName}>{name}</span>
          <span className={styles.leadershipRole}>{role}</span>
        </div>
        {linkedinHref && (
          <a className={styles.leadershipLinkedin} href={linkedinHref} aria-label={`LinkedIn de ${name}`}>
            in
          </a>
        )}
      </div>
    </div>
  );
}
