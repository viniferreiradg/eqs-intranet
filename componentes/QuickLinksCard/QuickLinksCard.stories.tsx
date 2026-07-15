import type { Meta, StoryObj } from '@storybook/react';
import { LifeBuoy, BookOpen, ShieldCheck } from 'lucide-react';
import { QuickLinksCard } from './QuickLinksCard';

const meta: Meta<typeof QuickLinksCard> = {
  title: 'Primitives/QuickLinksCard',
  component: QuickLinksCard,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Painel flutuante de atalhos — usado ao lado do Hero na Home do site institucional.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof QuickLinksCard>;

export const Default: Story = {
  args: {
    links: [
      { icon: LifeBuoy, title: 'Central de Suporte', subtitle: 'Abra um chamado', href: '#' },
      { icon: BookOpen, title: 'Manual da Marca EQS', subtitle: 'Diretrizes da identidade', href: '#' },
      { icon: ShieldCheck, title: 'Código de Conduta', subtitle: 'Políticas internas', href: '#' },
    ],
    footerLabel: 'Acessar todos os links',
    footerHref: '#',
  },
};
