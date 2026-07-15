import type { Meta, StoryObj } from '@storybook/react';
import { Calendar, MapPin, Users, CheckCircle } from 'lucide-react';
import { EventInfoCard } from './EventInfoCard';

const meta: Meta<typeof EventInfoCard> = {
  title: 'Primitives/EventInfoCard',
  component: EventInfoCard,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Card lateral com dados essenciais do evento (data, local, público-alvo, inscrições) + CTAs — usado na página de detalhe do evento.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof EventInfoCard>;

export const Default: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <EventInfoCard
        rows={[
          { icon: Calendar, label: 'Data', lines: ['08 de dezembro de 2026', 'Das 09h às 17h'] },
          {
            icon: MapPin,
            label: 'Local',
            lines: ['Auditório — Sede SP', 'Av. das Nações Unidas, 12.901', 'São Paulo / SP'],
            strongFirstLine: true,
          },
          { icon: Users, label: 'Público-alvo', lines: ['Equipes de Engenharia, Projetos e Planejamento'] },
          { icon: CheckCircle, label: 'Inscrições', lines: ['Até 03 de dezembro de 2026'] },
        ]}
      />
    </div>
  ),
};
