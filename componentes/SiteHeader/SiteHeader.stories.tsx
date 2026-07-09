import type { Meta, StoryObj } from '@storybook/react';
import { SiteHeader } from './SiteHeader';

const meta: Meta<typeof SiteHeader> = {
  title: 'Components/SiteHeader',
  component: SiteHeader,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Cabeçalho do site institucional — logo, menu horizontal, busca e avatar com menu.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof SiteHeader>;

const navItems = [
  { label: 'Notícias', href: '#', active: true },
  { label: 'Comunicados', href: '#' },
  { label: 'Sobre', href: '#' },
  { label: 'Links Úteis', href: '#' },
];

export const Default: Story = {
  render: () => (
    <div style={{ width: 960 }}>
      <SiteHeader navItems={navItems} user={{ name: 'Admin', initials: 'AD' }} />
    </div>
  ),
};
