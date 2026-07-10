import type { LucideIcon } from 'lucide-react';
import { Avatar } from '../Avatar/Avatar';
import { Button } from '../Button/Button';
import cardStyles from '../Card/Card.module.css';
import styles from './DepartmentDetailCard.module.css';

export interface DepartmentContact {
  name: string;
  initials: string;
  email: string;
  avatarUrl?: string;
}

export interface DepartmentDetailCardProps {
  icon: LucideIcon;
  name: string;
  manager: DepartmentContact;
  collaborators: DepartmentContact[];
  description: string;
  onDetails?: () => void;
}

export function DepartmentDetailCard({ icon: Icon, name, manager, collaborators, description, onDetails }: DepartmentDetailCardProps) {
  return (
    <div className={[cardStyles.card, styles.deptDetailCard].join(' ')}>
      <div className={styles.deptDetailHeader}>
        <div className={styles.deptDetailHeaderLeft}>
          <div className={styles.deptDetailTitleRow}>
            <span className={styles.deptDetailIcon}><Icon size={22} /></span>
            <h2 className={styles.deptDetailName}>{name}</h2>
          </div>
        </div>

        <span className={styles.deptDetailDivider} />

        <div className={styles.deptDetailManagerCol}>
          <span className={styles.deptDetailBadge}>Gestor responsável</span>
          <div className={styles.deptDetailManager}>
            <Avatar size="md" initials={manager.initials} src={manager.avatarUrl} alt={manager.name} />
            <div className={styles.deptDetailContactText}>
              <span className={styles.deptDetailContactName}>{manager.name}</span>
              <span className={styles.deptDetailContactEmail}>{manager.email}</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.deptDetailBody}>
        <span className={styles.deptDetailSectionLabel}>Colaboradores</span>
        <div className={styles.deptDetailCollabGrid}>
          {collaborators.map((person) => (
            <div className={styles.deptDetailCollabItem} key={person.email}>
              <Avatar size="sm" initials={person.initials} src={person.avatarUrl} alt={person.name} />
              <div className={styles.deptDetailContactText}>
                <span className={styles.deptDetailContactName}>{person.name}</span>
                <span className={styles.deptDetailContactEmail}>{person.email}</span>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.deptDetailFooter}>
          <p className={styles.deptDetailDescription}>{description}</p>
          <Button variant="secondary" onClick={onDetails}>Detalhes do setor</Button>
        </div>
      </div>
    </div>
  );
}
