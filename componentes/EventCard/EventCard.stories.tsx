import type { Meta, StoryObj } from '@storybook/react';
import { EventCard } from './EventCard';

const meta: Meta<typeof EventCard> = {
  title: 'Components/EventCard',
  component: EventCard,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Card de evento — usado na seção "Próximos Eventos" do site institucional.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof EventCard>;

export const Default: Story = {
  args: {
    image: 'https://placehold.co/640x360/2a2a2a/eee?text=Evento',
    day: '18',
    month: 'DEZ',
    title: 'Confraternização EQS 2026',
    location: 'Auditório — Sede SP',
  },
};

export const Grid: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--spacing-md)', width: 900 }}>
      <EventCard
        image="https://placehold.co/640x360/2a2a2a/eee?text=1"
        day="18"
        month="DEZ"
        title="Confraternização EQS 2026"
        location="Auditório — Sede SP"
      />
      <EventCard
        image="https://placehold.co/640x360/2a2a2a/eee?text=2"
        day="22"
        month="DEZ"
        title="Workshop de Segurança do Trabalho"
        location="Sala de Treinamento — Sede RJ"
      />
      <EventCard
        day="05"
        month="JAN"
        title="Reunião de Metas 2026"
        location="Transmissão on-line"
      />
    </div>
  ),
};
