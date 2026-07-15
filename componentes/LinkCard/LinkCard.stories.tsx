import type { Meta, StoryObj } from '@storybook/react';
import { BookOpen, ShieldCheck, LifeBuoy } from 'lucide-react';
import { LinkCard } from './LinkCard';

const meta: Meta<typeof LinkCard> = {
  title: 'Primitives/LinkCard',
  component: LinkCard,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Card simples de atalho — ícone + título + descrição. Usado na seção Links Úteis da Home.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof LinkCard>;

export const Default: Story = {
  args: {
    icon: BookOpen,
    title: 'Manual da Marca EQS',
    description: 'Diretrizes de identidade visual e uso da marca.',
  },
};

export const Grid: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--spacing-md)', width: 900 }}>
      <LinkCard icon={BookOpen} title="Manual da Marca EQS" description="Diretrizes de identidade visual e uso da marca." />
      <LinkCard icon={ShieldCheck} title="Código de Conduta" description="Políticas internas e diretrizes de ética." />
      <LinkCard icon={LifeBuoy} title="Central de Suporte" description="Abra um chamado com o time de TI ou Facilities." />
    </div>
  ),
};
