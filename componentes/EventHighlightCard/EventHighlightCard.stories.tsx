import type { Meta, StoryObj } from '@storybook/react';
import { MapPin, Clock, Calendar } from 'lucide-react';
import { EventHighlightCard } from './EventHighlightCard';

const meta: Meta<typeof EventHighlightCard> = {
  title: 'Primitives/EventHighlightCard',
  component: EventHighlightCard,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Card do evento em destaque — topo do painel "Próximos Eventos" da Home.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof EventHighlightCard>;

export const Default: Story = {
  args: {
    image: 'https://placehold.co/900x500/1a1a1a/eee?text=Evento',
    kicker: 'Agenda',
    heading: 'Próximo Evento',
    day: '18',
    month: 'Dez',
    title: 'Confraternização EQS 2026',
    meta: [
      { icon: MapPin, label: 'Auditório — Sede SP' },
      { icon: Clock, label: 'Início às 19h' },
    ],
    description: 'Um momento especial para celebrar nossas conquistas, fortalecer conexões e olhar juntos para o futuro.',
    ctaLabel: 'Confirmar presença',
  },
};

export const Wide: Story = {
  render: (args) => <div style={{ width: 960 }}><EventHighlightCard {...args} /></div>,
  args: {
    variant: 'wide',
    image: 'https://placehold.co/1200x400/1a1a1a/eee?text=Evento',
    kicker: 'Evento em destaque',
    title: 'Confraternização EQS 2026',
    meta: [
      { icon: Calendar, label: '18 de dezembro de 2026' },
      { icon: Clock, label: 'Das 09h às 17h' },
      { icon: MapPin, label: 'Auditório — Sede SP' },
    ],
    description: 'Um dia para celebrar nossas conquistas, reconhecer talentos e fortalecer conexões que constroem a EQS todos os dias.',
    ctaLabel: 'Confirmar presença',
    secondaryCtaLabel: 'Ver detalhes',
  },
};
