import type { LucideIcon } from 'lucide-react';
import styles from './NotificationItem.module.css';

export type NotificationStatus = 'success' | 'error' | 'warning' | 'info' | 'neutral';

export interface NotificationItemProps {
  /** Ícone Lucide exibido no box tintado */
  icon: LucideIcon;
  /** Tipo — define a cor do box do ícone (tokens de status). 'neutral' = cinza */
  status?: NotificationStatus;
  title: string;
  description?: string;
  /** Horário relativo, ex: "Agora", "14 min", "Ontem" */
  time?: string;
  /** Exibe o dot de não lida ao lado do título */
  unread?: boolean;
}

export function NotificationItem({
  icon: Icon,
  status = 'neutral',
  title,
  description,
  time,
  unread = false,
}: NotificationItemProps) {
  return (
    <div className={styles.notifItem}>
      <span
        className={styles.notifItemIcon}
        {...(status !== 'neutral' ? { 'data-status': status } : {})}
      >
        <Icon size={16} />
      </span>
      <div className={styles.notifItemBody}>
        <div className={styles.notifItemTitleRow}>
          <span className={styles.notifItemTitle}>
            {unread && <span className={styles.notifItemDot} />}
            {title}
          </span>
          {time && <span className={styles.notifItemTime}>{time}</span>}
        </div>
        {description && <span className={styles.notifItemDescription}>{description}</span>}
      </div>
    </div>
  );
}

/** Container com divisórias entre itens */
export function NotificationList({ children }: { children: React.ReactNode }) {
  return <div className={styles.notifList}>{children}</div>;
}
