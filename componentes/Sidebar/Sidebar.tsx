import { ReactNode } from 'react';
import {
  LayoutDashboard,
  Newspaper,
  CalendarCheck,
  Megaphone,
  Link2,
  Building2,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
  Bell,
} from 'lucide-react';
import { NotificationBadge } from '../NotificationBadge/NotificationBadge';
import styles from './Sidebar.module.css';
import { Logo, LogoSymbol } from '../Logo/Logo';
import { Avatar } from '../Avatar/Avatar';

/* ── Types ─────────────────────────────────────────────────────────────── */

export type NavItemDef = {
  id: string;
  label: string;
  icon: ReactNode;
  /** Mostra ponto de notificação (círculo brand) */
  dot?: boolean;
  /** Mostra chevron de sub-menu */
  hasDropdown?: boolean;
};

export type SidebarUser = {
  name: string;
  email: string;
  /** Iniciais exibidas no avatar (máx 2 chars) */
  initials: string;
};

export type SidebarProps = {
  open?: boolean;
  onToggle?: () => void;
  activeItem?: string;
  onNavClick?: (id: string) => void;
  user?: SidebarUser;
  onLogout?: () => void;
  /** Filtra itens exclusivos do adm quando 'empresa' */
  role?: 'adm' | 'empresa';
  theme?: 'dark' | 'light';
  onThemeToggle?: () => void;
  /** Número de notificações exibido no badge do sininho. 0 = sem badge. */
  notificationCount?: number;
};

/* ── Default nav items — menu do painel-adm ──────────────────────────────── */
/* `role` fica reservado para o dia em que outro painel reaproveitar este
   componente com um subconjunto de itens — hoje nenhum item é filtrado. */

export const defaultNavItems: NavItemDef[] = [
  { id: 'dashboard',             label: 'Dashboard',              icon: <LayoutDashboard size={20} /> },
  { id: 'noticias',              label: 'Notícias',                icon: <Newspaper       size={20} /> },
  { id: 'eventos',               label: 'Eventos',                 icon: <CalendarCheck   size={20} /> },
  { id: 'comunicados',           label: 'Comunicados',             icon: <Megaphone       size={20} /> },
  { id: 'links-uteis',           label: 'Links Úteis',             icon: <Link2           size={20} /> },
  { id: 'areas-departamentos',   label: 'Áreas e Departamentos',   icon: <Building2       size={20} /> },
  { id: 'configuracoes',         label: 'Configurações',           icon: <Settings        size={20} /> },
];

const defaultUser: SidebarUser = {
  name: 'Admin',
  email: 'admin@empresa.com',
  initials: 'AD',
};

/* ── Sidebar ────────────────────────────────────────────────────────────── */

export function Sidebar({
  open = true,
  onToggle,
  activeItem = 'dashboard',
  onNavClick,
  user = defaultUser,
  onLogout,
  theme = 'dark',
  onThemeToggle,
  notificationCount = 0,
}: SidebarProps) {
  const navItems = defaultNavItems;

  return (
    <aside className={[styles.sidebar, open ? styles.open : styles.closed].join(' ')}>

      {/* ── Logo + Toggle (alinhados na mesma altura) ────────────────── */}
      <div className={styles.logoRow}>
        <div className={styles.logoWrap}>
          {open ? <Logo width={100} /> : <LogoSymbol size="md" />}
        </div>
        <button
          className={styles.toggleBtn}
          onClick={onToggle}
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          type="button"
        >
          {open ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
        </button>
      </div>

      {/* ── Nav + bottom (gap 404 em Figma = flex:1 spacer) ──────────── */}
      <div className={styles.body}>

        {/* Nav List principal */}
        <nav className={styles.navList}>
          {navItems.map(item => {
            const isActive = item.id === activeItem;
            return (
              <button
                key={item.id}
                className={[styles.navItem, isActive ? styles.navItemActive : ''].join(' ')}
                onClick={() => onNavClick?.(item.id)}
                title={!open ? item.label : undefined}
                aria-current={isActive ? 'page' : undefined}
                type="button"
              >
                <span className={styles.navIcon}>{item.icon}</span>
                {open && (
                  <>
                    <span className={styles.navLabel}>{item.label}</span>
                    {item.dot && (
                      <span className={styles.navTrail}>
                        <span className={styles.dot} />
                      </span>
                    )}
                  </>
                )}
              </button>
            );
          })}
        </nav>

        {/* Spacer — empurra a seção de baixo para o fundo */}
        <div className={styles.spacer} />

        {/* Bottom — separador + usuário + sair */}
        <div className={styles.bottomList}>
          {/* Icon row: tema + notificações (Configurações vive no menu principal) */}
          <div className={styles.iconRow}>
            <button
              className={styles.iconBtn}
              onClick={onThemeToggle}
              aria-label={theme === 'dark' ? 'Modo claro' : 'Modo escuro'}
              title={theme === 'dark' ? 'Modo claro' : 'Modo escuro'}
              type="button"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <NotificationBadge count={notificationCount}>
              <button
                className={styles.iconBtn}
                aria-label={notificationCount > 0 ? `${notificationCount} notificações` : 'Notificações'}
                title="Notificações"
                type="button"
              >
                <Bell size={16} />
              </button>
            </NotificationBadge>
          </div>

          <div className={styles.separator} />

          {/* Avatar + nome/email */}
          <div className={styles.userRow}>
            <Avatar initials={user.initials} size="md" />
            {open && (
              <div className={styles.userInfo}>
                <span className={styles.userName}>{user.name}</span>
                <span className={styles.userEmail}>{user.email}</span>
              </div>
            )}
          </div>

          {/* Sair */}
          <button
            className={styles.navItem}
            onClick={onLogout}
            title={!open ? 'Sair' : undefined}
            type="button"
          >
            <span className={styles.navIcon}><LogOut size={20} /></span>
            {open && <span className={styles.navLabelLogout}>Sair</span>}
          </button>
        </div>
      </div>


    </aside>
  );
}
