import { Mail } from 'lucide-react';
import { Avatar } from '../Avatar/Avatar';
import cardStyles from '../Card/Card.module.css';
import styles from './TeamMemberCard.module.css';

export interface TeamMemberCardProps {
  name: string;
  /** Cargo/função, ex: "Analista de Marketing Pleno" */
  role: string;
  email: string;
  avatarUrl?: string;
  initials?: string;
}

export function TeamMemberCard({ name, role, email, avatarUrl, initials }: TeamMemberCardProps) {
  return (
    <div className={`${cardStyles.card} ${styles.teamMemberCard}`}>
      <Avatar size="md" src={avatarUrl} initials={initials} alt={name} />
      <div className={styles.teamMemberText}>
        <span className={styles.teamMemberName}>{name}</span>
        <span className={styles.teamMemberRole}>{role}</span>
        <span className={styles.teamMemberEmail}>{email}</span>
      </div>
      <a className={styles.teamMemberMailBtn} href={`mailto:${email}`} aria-label={`Enviar e-mail para ${name}`}>
        <Mail size={16} />
      </a>
    </div>
  );
}
