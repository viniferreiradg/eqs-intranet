import { useState } from 'react';
import { Search, Menu, X } from 'lucide-react';
import { Logo } from '../Logo/Logo';
import styles from './SiteHeaderMobile.module.css';

export interface SiteHeaderMobileProps {
  onMenuOpen?: () => void;
  onSearch?: (value: string) => void;
}

export function SiteHeaderMobile({ onMenuOpen, onSearch }: SiteHeaderMobileProps) {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className={styles.siteHeaderMobile}>
      {!searchOpen ? (
        <div className={styles.siteHeaderMobileRow}>
          <button className={styles.siteHeaderMobileIconBtn} type="button" aria-label="Buscar" onClick={() => setSearchOpen(true)}>
            <Search size={20} />
          </button>
          <Logo size="sm" />
          <button className={styles.siteHeaderMobileIconBtn} type="button" aria-label="Abrir menu" onClick={onMenuOpen}>
            <Menu size={20} />
          </button>
        </div>
      ) : (
        <div className={styles.siteHeaderMobileSearchRow}>
          <input
            className={styles.siteHeaderMobileSearchInput}
            type="text"
            placeholder="Buscar..."
            autoFocus
            onChange={(e) => onSearch?.(e.target.value)}
          />
          <button className={styles.siteHeaderMobileIconBtn} type="button" aria-label="Fechar busca" onClick={() => setSearchOpen(false)}>
            <X size={20} />
          </button>
        </div>
      )}
    </header>
  );
}
