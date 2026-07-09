import { FileText, Download } from 'lucide-react';
import styles from './DocumentListItem.module.css';

export interface DocumentListItemProps {
  name: string;
  meta: string;
  href?: string;
}

export function DocumentListItem({ name, meta, href = '#' }: DocumentListItemProps) {
  return (
    <div className={styles.docItem}>
      <span className={styles.docIcon}><FileText size={18} /></span>
      <div className={styles.docText}>
        <span className={styles.docName}>{name}</span>
        <span className={styles.docMeta}>{meta}</span>
      </div>
      <a className={styles.docDownload} href={href} download>
        <Download size={14} /> Baixar
      </a>
    </div>
  );
}
