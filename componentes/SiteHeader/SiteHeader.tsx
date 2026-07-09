import { Search, User, LogOut } from 'lucide-react';
import { Logo } from '../Logo/Logo';
import { Input } from '../Input/Input';
import { Avatar } from '../Avatar/Avatar';
import { DropdownMenu } from '../DropdownMenu/DropdownMenu';
import styles from './SiteHeader.module.css';

export interface SiteHeaderNavItem {
  label: string;
  href: string;
  active?: boolean;
}

export interface SiteHeaderUser {
  name: string;
  initials: string;
}

export interface SiteHeaderProps {
  navItems: SiteHeaderNavItem[];
  user: SiteHeaderUser;
  onSearchChange?: (value: string) => void;
  onProfileClick?: () => void;
  onLogout?: () => void;
}

export function SiteHeader({ navItems, user, onSearchChange, onProfileClick, onLogout }: SiteHeaderProps) {
  return (
    <header className={styles.siteHeader}>
      <div className={styles.siteHeaderInner}>
        <Logo size="sm" />

        <nav className={styles.siteHeaderNav}>
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={[styles.siteHeaderNavItem, item.active ? styles.siteHeaderNavItemActive : '']
                .filter(Boolean)
                .join(' ')}
              aria-current={item.active ? 'page' : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className={styles.siteHeaderActions}>
          <div className={styles.siteHeaderSearch}>
            <Input
              iconLeft={<Search size={16} />}
              placeholder="Buscar..."
              onChange={(e) => onSearchChange?.(e.target.value)}
            />
          </div>

          <DropdownMenu
            align="end"
            trigger={
              <button className={styles.siteHeaderAvatarBtn} aria-label={`Menu de ${user.name}`} type="button">
                <Avatar initials={user.initials} size="sm" />
              </button>
            }
            sections={[
              { items: [
                { label: 'Meu Perfil', icon: <User size={16} />, onClick: onProfileClick },
                { label: 'Sair', icon: <LogOut size={16} />, onClick: onLogout, destructive: true },
              ] },
            ]}
          />
        </div>
      </div>
    </header>
  );
}
