import type { Meta, StoryObj } from '@storybook/react';
import { CalendarMonth } from './CalendarMonth';

const eventos = [
  { date: '2026-12-08', time: '09:00', title: 'Workshop BIM 4.0', status: 'publicado' as const },
  { date: '2026-12-18', time: '19:00', title: 'Confraternização EQS 2026', status: 'publicado' as const },
  { date: '2026-12-22', time: '14:00', title: 'Workshop de Segurança do Trabalho', status: 'publicado' as const },
  { date: '2026-12-28', time: '10:00', title: 'Planejamento 2027', status: 'rascunho' as const },
];

const meta: Meta<typeof CalendarMonth> = {
  title: 'Primitives/CalendarMonth',
  component: CalendarMonth,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Grade mensal de eventos — visão calendário do painel. Dia atual destacado em cinza neutro; chips com dot de status (verde publicado, cinza rascunho).',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof CalendarMonth>;

export const Default: Story = {
  args: {
    year: 2026,
    month: 11,
    events: eventos,
    today: new Date(2026, 11, 15),
  },
};

export const ComAdicaoRapida: Story = {
  args: {
    year: 2026,
    month: 11,
    events: eventos,
    today: new Date(2026, 11, 15),
    onAddClick: (dateIso) => alert(`Adicionar evento em ${dateIso}`),
  },
  parameters: {
    docs: {
      description: {
        story: 'Com `onAddClick`, cada dia do mês exibe um botão "+" no hover (canto superior direito) para adição rápida de evento.',
      },
    },
  },
};

export const SemEventos: Story = {
  args: {
    year: 2026,
    month: 10,
    events: [],
    today: new Date(2026, 10, 4),
  },
};
