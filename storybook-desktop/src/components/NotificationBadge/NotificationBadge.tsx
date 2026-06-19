import { ReactNode } from 'react';
import styles from './NotificationBadge.module.css';

export type NotificationBadgeProps = {
  /** Número de notificações. 0 = badge oculto. */
  count: number;
  /** Valor máximo antes de exibir "+". Default: 9. */
  max?: number;
  /** Elemento envolvido (ícone, botão, etc.) */
  children: ReactNode;
};

export function NotificationBadge({
  count,
  max = 9,
  children,
}: NotificationBadgeProps) {
  const visible = count > 0;
  const label   = count > max ? `${max}+` : String(count);

  return (
    <span className={styles.wrap}>
      {children}
      {visible && (
        <span
          className={styles.badge}
          aria-label={`${count} notificações`}
          role="status"
        >
          {label}
        </span>
      )}
    </span>
  );
}
