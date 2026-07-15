import type { Meta, StoryObj } from '@storybook/react';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { EventRow } from './EventRow';

const meta: Meta<typeof EventRow> = {
  title: 'Primitives/EventRow',
  component: EventRow,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Linha horizontal de evento — usada na listagem completa de Eventos (imagem + tag + título + meta + descrição + CTA).',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof EventRow>;

export const Default: Story = {
  render: (args) => <div style={{ width: 700 }}><EventRow {...args} /></div>,
  args: {
    image: 'https://placehold.co/320x240/2a2a2a/eee?text=Evento',
    day: '22',
    month: 'Dez',
    tag: 'Workshop',
    tagStatus: 'success',
    title: 'Workshop de Segurança do Trabalho',
    meta: [
      { icon: Calendar, label: 'Segunda-feira, 22 de dezembro de 2026' },
      { icon: MapPin, label: 'Sala de Treinamento — Sede RJ' },
      { icon: Clock, label: 'Das 14h às 16h' },
    ],
    description: 'Boas práticas, prevenção e inovação para um ambiente seguro para todos.',
    ctaLabel: 'Confirmar presença',
  },
};
