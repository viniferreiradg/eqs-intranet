import { type ReactNode } from 'react';
import { ChevronRight } from 'lucide-react';
import styles from './SearchResultItem.module.css';

export interface SearchResultItemProps {
  /** Miniatura, ícone ou date-badge — slot livre à esquerda */
  leading: ReactNode;
  /** Título — passar um <mark> inline para destacar o termo buscado */
  title: ReactNode;
  description?: string;
  /** Conteúdo à direita — data, contagem, local etc. */
  meta?: ReactNode;
  showChevron?: boolean;
  href?: string;
}

export function SearchResultItem({ leading, title, description, meta, showChevron, href = '#' }: SearchResultItemProps) {
  return (
    <a className={styles.searchResultItem} href={href}>
      <div className={styles.searchResultItemLeading}>{leading}</div>
      <div className={styles.searchResultItemText}>
        <span className={styles.searchResultItemTitle}>{title}</span>
        {description && <span className={styles.searchResultItemDescription}>{description}</span>}
      </div>
      {meta && <div className={styles.searchResultItemMeta}>{meta}</div>}
      {showChevron && <ChevronRight className={styles.searchResultItemChevron} size={16} />}
    </a>
  );
}
