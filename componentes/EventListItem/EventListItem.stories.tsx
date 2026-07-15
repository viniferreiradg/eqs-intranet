import type { Meta, StoryObj } from '@storybook/react';
import { EventListItem } from './EventListItem';

const meta: Meta<typeof EventListItem> = {
  title: 'Primitives/EventListItem',
  component: EventListItem,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Linha compacta de evento — usada na lista "Outros eventos" ao lado do evento em destaque.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof EventListItem>;

export const Default: Story = {
  args: {
    day: '22',
    month: 'Dez',
    title: 'Workshop de Segurança do Trabalho',
    location: 'Sala de Treinamento — Sede RJ',
  },
};

export const List: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)', width: 400 }}>
      <EventListItem day="22" month="Dez" title="Workshop de Segurança do Trabalho" location="Sala de Treinamento — Sede RJ" />
      <EventListItem day="05" month="Jan" title="Reunião de Metas 2026" location="Transmissão on-line" />
    </div>
  ),
};
