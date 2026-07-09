import type { Meta, StoryObj } from '@storybook/react';
import { ShieldCheck, User, Lightbulb, Handshake, Users } from 'lucide-react';
import { ValueCard } from './ValueCard';

const meta: Meta<typeof ValueCard> = {
  title: 'Components/ValueCard',
  component: ValueCard,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Ícone circular (outline) + título + descrição, centralizado — usado na seção "Nossos valores" da página Sobre.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof ValueCard>;

export const Default: Story = {
  args: {
    icon: ShieldCheck,
    title: 'Segurança',
    description: 'Cuidamos das pessoas acima de tudo, sempre.',
  },
};

export const List: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 'var(--spacing-md)', width: 900 }}>
      <ValueCard icon={ShieldCheck} title="Segurança" description="Cuidamos das pessoas acima de tudo, sempre." />
      <ValueCard icon={User} title="Ética" description="Agimos com integridade, transparência e respeito." />
      <ValueCard icon={Lightbulb} title="Inovação" description="Buscamos soluções criativas e eficientes." />
      <ValueCard icon={Handshake} title="Compromisso" description="Entregamos resultados com responsabilidade." />
      <ValueCard icon={Users} title="Valorização de pessoas" description="Acreditamos no talento e no trabalho em equipe." />
    </div>
  ),
};
