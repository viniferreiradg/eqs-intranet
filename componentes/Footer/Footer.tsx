import { Logo } from '../Logo/Logo';
import styles from './Footer.module.css';

export interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

export interface FooterProps {
  columns?: FooterColumn[];
}

const defaultColumns: FooterColumn[] = [
  { title: 'Portal', links: [
    { label: 'Notícias', href: 'noticias.html' },
    { label: 'Eventos', href: 'eventos.html' },
    { label: 'Comunicados', href: 'comunicados.html' },
    { label: 'Áreas e Departamentos', href: 'areas-departamentos.html' },
  ] },
  { title: 'Institucional', links: [
    { label: 'Sobre', href: 'sobre.html' },
    { label: 'Links Úteis', href: 'links-uteis.html' },
  ] },
];

export function Footer({ columns = defaultColumns }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerBrand}>
          <Logo size="sm" />
          <p className={styles.footerTagline}>Intranet corporativa da EQS Engenharia.</p>
        </div>

        <div className={styles.footerColumns}>
          {columns.map((col) => (
            <div className={styles.footerColumn} key={col.title}>
              <span className={styles.footerColumnTitle}>{col.title}</span>
              {col.links.map((link) => (
                <a className={styles.footerLink} href={link.href} key={link.label}>{link.label}</a>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.footerBottom}>
        © {year} EQS Engenharia. Todos os direitos reservados.
      </div>
    </footer>
  );
}
