import type { Meta, StoryObj } from '@storybook/react';
import { Hero } from './Hero';

const meta: Meta<typeof Hero> = {
  title: 'Components/Hero',
  component: Hero,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Banner de destaque — usado no topo da Home do site institucional.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Hero>;

export const Default: Story = {
  args: {
    image: 'https://placehold.co/1200x600/1a1a1a/eee?text=Destaque',
    tag: 'Destaque',
    title: 'Expansão do Terminal Norte: Marco de 85% Concluído',
    description: 'A EQS Engenharia celebra o avanço das obras estruturais no Terminal Norte, mantendo o padrão de precisão técnica e segurança.',
  },
};

export const WithoutImage: Story = {
  args: {
    tag: 'Destaque',
    title: 'Reunião de Metas 2026 será transmitida on-line',
    description: 'Participe da apresentação dos resultados e metas do próximo ano fiscal.',
  },
};
