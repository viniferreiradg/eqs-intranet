import { ReactNode, useEffect } from 'react';
import { X } from 'lucide-react';
import styles from './Dialog.module.css';

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  actions?: ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export function Dialog({ open, onClose, title, children, actions, size = 'md' }: DialogProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (open) document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className={styles.dialogOverlay} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }} role="dialog" aria-modal="true" aria-labelledby="dialog-title">
      <div className={[styles.dialog, styles[size]].join(' ')}>
        <div className={styles.dialogHeader}>
          <h2 id="dialog-title" className={styles.dialogTitle}>{title}</h2>
          <button className={styles.dialogCloseBtn} onClick={onClose} aria-label="Fechar"><X size={18} /></button>
        </div>
        <div className={styles.dialogBody}>{children}</div>
        {actions && <div className={styles.dialogFooter}>{actions}</div>}
      </div>
    </div>
  );
}
