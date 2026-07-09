import { type LucideIcon, ChevronRight } from 'lucide-react';
import styles from './QuickLinksCard.module.css';

export interface QuickLink {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  href?: string;
}

export interface QuickLinksCardProps {
  links: QuickLink[];
  footerLabel?: string;
  footerHref?: string;
}

export function QuickLinksCard({ links, footerLabel = 'Acessar todos os links', footerHref = '#' }: QuickLinksCardProps) {
  return (
    <div className={styles.quickLinksCard}>
      <div className={styles.quickLinksList}>
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <a className={styles.quickLinksItem} href={link.href ?? '#'} key={link.title}>
              <span className={styles.quickLinksItemIcon}><Icon size={18} /></span>
              <span className={styles.quickLinksItemText}>
                <span className={styles.quickLinksItemTitle}>{link.title}</span>
                {link.subtitle && <span className={styles.quickLinksItemSubtitle}>{link.subtitle}</span>}
              </span>
              <ChevronRight className={styles.quickLinksItemChevron} size={16} />
            </a>
          );
        })}
      </div>
      <a className={styles.quickLinksFooter} href={footerHref}>
        {footerLabel}
        <ChevronRight size={16} />
      </a>
    </div>
  );
}
