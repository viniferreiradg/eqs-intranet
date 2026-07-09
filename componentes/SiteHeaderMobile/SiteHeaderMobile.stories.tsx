import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { User, LogOut } from 'lucide-react';
import { SiteHeaderMobile } from './SiteHeaderMobile';
import { Sheet } from '../Sheet/Sheet';
import styles from './SiteHeaderMobile.module.css';

const meta: Meta<typeof SiteHeaderMobile> = {
  title: 'Components/SiteHeaderMobile',
  component: SiteHeaderMobile,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Header do site institucional em telas mobile — busca à esquerda, logo central, hambúrguer à direita. Tocar na busca transforma a linha num input + botão de fechar. O menu (hambúrguer) reaproveita o componente Sheet, com as classes .siteHeaderMobileNav* pro conteúdo.',
      },
    },
    viewport: { defaultViewport: 'mobile1' },
  },
};
export default meta;
type Story = StoryObj<typeof SiteHeaderMobile>;

export const Default: Story = {
  args: {},
  decorators: [(Story) => <div style={{ width: 375 }}><Story /></div>],
};

const NAV_ITEMS = ['Home', 'Notícias', 'Eventos', 'Comunicados', 'Áreas e Departamentos', 'Sobre', 'Links Úteis'];

export const WithMenu: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div style={{ width: 375 }}>
        <SiteHeaderMobile onMenuOpen={() => setOpen(true)} />
        <Sheet
          open={open}
          onClose={() => setOpen(false)}
          title="Menu"
          footer={
            <div className={styles.siteHeaderMobileFooterList}>
              <a className={styles.siteHeaderMobileFooterItem} href="#"><User size={16} /> Meu Perfil</a>
              <a className={`${styles.siteHeaderMobileFooterItem} ${styles.siteHeaderMobileFooterItemDestructive}`} href="#"><LogOut size={16} /> Sair</a>
            </div>
          }
        >
          <nav className={styles.siteHeaderMobileNavList}>
            {NAV_ITEMS.map((label, i) => (
              <a className={i === 0 ? `${styles.siteHeaderMobileNavItem} ${styles.siteHeaderMobileNavItemActive}` : styles.siteHeaderMobileNavItem} href="#" key={label}>
                {label}
              </a>
            ))}
          </nav>
        </Sheet>
      </div>
    );
  },
};
