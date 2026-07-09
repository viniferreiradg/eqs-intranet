import type { Meta, StoryObj } from '@storybook/react';
import { NewsCard } from './NewsCard';

const meta: Meta<typeof NewsCard> = {
  title: 'Components/NewsCard',
  component: NewsCard,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Card de conteúdo — usado nas prévias de Notícias e Comunicados no site institucional.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof NewsCard>;

export const Default: Story = {
  args: {
    image: 'https://placehold.co/640x360/2a2a2a/eee?text=Not%C3%ADcia',
    tag: 'Institucional',
    tagStatus: 'info',
    title: 'Expansão do Terminal Norte atinge 85% de conclusão',
    excerpt: 'A EQS Engenharia celebra o avanço das obras estruturais no Terminal Norte, mantendo o padrão de precisão técnica e segurança.',
    date: '12 de dezembro de 2026',
  },
};

export const Grid: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--spacing-md)', width: 900 }}>
      <NewsCard
        image="https://placehold.co/640x360/2a2a2a/eee?text=1"
        tag="Institucional"
        tagStatus="info"
        title="Expansão do Terminal Norte atinge 85% de conclusão"
        excerpt="A EQS Engenharia celebra o avanço das obras estruturais no Terminal Norte."
        date="12 dez 2026"
      />
      <NewsCard
        image="https://placehold.co/640x360/2a2a2a/eee?text=2"
        tag="Evento"
        tagStatus="success"
        title="Workshop BIM 4.0 reúne equipe técnica"
        excerpt="Auditório principal recebeu treinamento sobre as novas ferramentas de modelagem."
        date="08 dez 2026"
      />
      <NewsCard
        title="Confraternização EQS 2026 — detalhes do evento"
        tag="RH"
        tagStatus="warning"
        excerpt="Confira data, local e programação da confraternização de fim de ano."
        date="05 dez 2026"
      />
    </div>
  ),
};
