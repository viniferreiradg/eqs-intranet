import { ReactNode } from 'react';
import { X, ChevronLeft } from 'lucide-react';
import styles from './Modal.module.css';

export interface ModalProps {
  title: string;
  onBack?: () => void;
  onClose?: () => void;
  children: ReactNode;
}

export function Modal({ title, onBack, onClose, children }: ModalProps) {
  return (
    <div className={styles.modal}>
      <div className={styles.header}>
        <div className={styles.headerStart}>
          {onBack && (
            <button className={styles.navBtn} onClick={onBack} aria-label="Voltar">
              <ChevronLeft size={20} />
            </button>
          )}
        </div>
        <div className={styles.headerCenter}>
          <h2 className={styles.title}>{title}</h2>
        </div>
        <div className={styles.headerEnd}>
          {onClose && (
            <button className={styles.navBtn} onClick={onClose} aria-label="Fechar">
              <X size={18} />
            </button>
          )}
        </div>
      </div>
      <div className={styles.body}>{children}</div>
    </div>
  );
}
