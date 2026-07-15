import type { Meta, StoryObj } from '@storybook/react';
import { EventCalendar } from './EventCalendar';

const meta: Meta<typeof EventCalendar> = {
  title: 'Primitives/EventCalendar',
  component: EventCalendar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Calendário compacto — coluna lateral do painel "Próximos Eventos" da Home. Estático (protótipo), navegação de mês sem lógica real.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof EventCalendar>;

const decemberDays = [
  null, null, 1, 2, 3, 4, 5,
  6, 7, 8, 9, 10, 11, 12,
  13, 14, 15, 16, 17, 18, 19,
  20, 21, 22, 23, 24, 25, 26,
  27, 28, 29, 30, 31, null, null,
];

export const Default: Story = {
  args: {
    monthLabel: 'Dezembro 2026',
    days: decemberDays,
    highlightDays: [18],
    footerLabel: 'Ver todos os eventos',
  },
};
