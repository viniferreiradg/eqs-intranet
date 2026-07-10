import { Download } from 'lucide-react';
import cardStyles from '../Card/Card.module.css';
import styles from './DocumentCard.module.css';

export interface DocumentCardProps {
  title: string;
  description?: string;
  /** Ex: "PDF" — exibido em maiúsculas dentro de um badge com outline */
  fileType: string;
  /** Ex: "8.4 MB" */
  fileSize: string;
  /** Ex: "12/05/2025" */
  updatedAt: string;
  href?: string;
}

export function DocumentCard({ title, description, fileType, fileSize, updatedAt, href = '#' }: DocumentCardProps) {
  return (
    <a className={`${cardStyles.card} ${styles.documentCard}`} href={href}>
      <div className={styles.documentCardMain}>
        <h3 className={styles.documentCardTitle}>{title}</h3>
        {description && <p className={styles.documentCardDescription}>{description}</p>}
        <div className={styles.documentCardMeta}>
          <span className={styles.documentCardBadge}>.{fileType}</span>
          <span>{fileSize}</span>
          <span>Atualizado em {updatedAt}</span>
        </div>
      </div>
      <div className={styles.documentCardDivider} />
      <div className={styles.documentCardDownload}>
        <span className={styles.documentCardDownloadIcon}><Download size={20} /></span>
        <span className={styles.documentCardDownloadLabel}>Fazer download</span>
      </div>
    </a>
  );
}
