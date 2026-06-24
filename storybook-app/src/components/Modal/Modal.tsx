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
      <div className={styles.modalHeader}>
        <div className={styles.modalHeaderStart}>
          {onBack && (
            <button className={styles.modalNavBtn} onClick={onBack} aria-label="Voltar">
              <ChevronLeft size={20} />
            </button>
          )}
        </div>
        <div className={styles.modalHeaderCenter}>
          <h2 className={styles.modalTitle}>{title}</h2>
        </div>
        <div className={styles.modalHeaderEnd}>
          {onClose && (
            <button className={styles.modalNavBtn} onClick={onClose} aria-label="Fechar">
              <X size={18} />
            </button>
          )}
        </div>
      </div>
      <div className={styles.modalBody}>{children}</div>
    </div>
  );
}
