import { type LucideIcon } from 'lucide-react';
import { Avatar } from '../Avatar/Avatar';
import cardStyles from '../Card/Card.module.css';
import styles from './DepartmentCard.module.css';

export interface DepartmentPerson {
  name: string;
  initials: string;
  avatarUrl?: string;
}

export interface DepartmentCardProps {
  icon: LucideIcon;
  name: string;
  manager: DepartmentPerson;
  collaborators: DepartmentPerson[];
  maxAvatars?: number;
  href?: string;
}

export function DepartmentCard({ icon: Icon, name, manager, collaborators, maxAvatars = 4, href = '#' }: DepartmentCardProps) {
  const visible = collaborators.slice(0, maxAvatars);
  const extra = collaborators.length - visible.length;

  return (
    <a className={[cardStyles.card, styles.deptCard].join(' ')} href={href}>
      <div className={styles.deptHeader}>
        <span className={styles.deptIcon}><Icon size={20} /></span>
        <h3 className={styles.deptName}>{name}</h3>
      </div>

      <div className={styles.deptRow}>
        <span className={styles.deptRowLabel}>Gestor responsável</span>
        <div className={styles.deptManager}>
          <Avatar size="sm" initials={manager.initials} src={manager.avatarUrl} alt={manager.name} />
          <span className={styles.deptManagerName}>{manager.name}</span>
        </div>
      </div>

      <div className={styles.deptRow}>
        <span className={styles.deptRowLabel}>Colaboradores</span>
        <div className={styles.deptAvatarStack}>
          {visible.map((person) => (
            <span className={styles.deptAvatarStackItem} key={person.name}>
              <Avatar size="sm" initials={person.initials} src={person.avatarUrl} alt={person.name} />
            </span>
          ))}
          {extra > 0 && <span className={styles.deptAvatarMore}>+{extra}</span>}
        </div>
      </div>
    </a>
  );
}
