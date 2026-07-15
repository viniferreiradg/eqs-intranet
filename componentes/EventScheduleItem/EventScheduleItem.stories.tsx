import type { Meta, StoryObj } from '@storybook/react';
import { EventScheduleItem } from './EventScheduleItem';

const meta: Meta<typeof EventScheduleItem> = {
  title: 'Primitives/EventScheduleItem',
  component: EventScheduleItem,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Item da lista "Programação" na página de detalhe do evento — ponto + conector vertical, horário e título na mesma linha, descrição abaixo.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof EventScheduleItem>;

export const Default: Story = {
  args: {
    time: '09h00',
    title: 'Abertura',
    description: 'Boas-vindas e apresentação dos objetivos do workshop.',
  },
};

export const List: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', width: 420 }}>
      <EventScheduleItem time="09h00" title="Abertura" description="Boas-vindas e apresentação dos objetivos do workshop." />
      <EventScheduleItem time="10h00" title="Introdução ao BIM 4.0" description="Novas funcionalidades e benefícios para os projetos." />
      <EventScheduleItem time="12h00" title="Almoço" />
      <EventScheduleItem time="16h45" title="Encerramento e próximos passos" description="Próximas turmas e plano de implementação." />
    </div>
  ),
};
