import type { Meta, StoryObj } from '@storybook/react';
import { HeartPulse, Wrench, UtensilsCrossed } from 'lucide-react';
import { CommunicationListItem } from './CommunicationListItem';

const meta: Meta<typeof CommunicationListItem> = {
  title: 'Primitives/CommunicationListItem',
  component: CommunicationListItem,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Linha de lista vertical — usada na seção Comunicados da Home.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof CommunicationListItem>;

export const Default: Story = {
  args: {
    icon: HeartPulse,
    title: 'Atualização do plano de saúde a partir de janeiro',
    description: 'Novas regras de coparticipação entram em vigor na próxima data.',
    date: '16 de dezembro de 2026',
  },
};

export const List: Story = {
  render: () => (
    <div style={{ width: 700, background: 'var(--color-bg-surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-subtle)' }}>
      <CommunicationListItem
        icon={HeartPulse}
        title="Atualização do plano de saúde a partir de janeiro"
        description="Novas regras de coparticipação entram em vigor na próxima data."
        date="16 de dezembro de 2026"
      />
      <CommunicationListItem
        icon={Wrench}
        title="Manutenção programada no sistema financeiro"
        description="Sistema ficará indisponível no sábado, das 01h às 05h."
        date="08 de dezembro de 2026"
      />
      <CommunicationListItem
        icon={UtensilsCrossed}
        title="Novo horário de funcionamento do refeitório"
        description="A partir de segunda-feira, o almoço passa a ser servido das 11h30 às 14h."
        date="03 de dezembro de 2026"
      />
    </div>
  ),
};
