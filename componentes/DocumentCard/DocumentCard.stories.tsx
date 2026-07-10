import type { Meta, StoryObj } from '@storybook/react';
import { DocumentCard } from './DocumentCard';

const meta: Meta<typeof DocumentCard> = {
  title: 'Components/DocumentCard',
  component: DocumentCard,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Card de documento para download — usado na página "Documentos". Título/descrição + badge de tipo/tamanho/data à esquerda, divisor, ícone de download à direita.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof DocumentCard>;

export const Default: Story = {
  args: {
    title: 'Manual da Marca EQS',
    description: 'Diretrizes de identidade visual e uso da marca.',
    fileType: 'PDF',
    fileSize: '8.4 MB',
    updatedAt: '12/05/2025',
  },
};

export const Grid: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--spacing-md)', width: 700 }}>
      <DocumentCard title="Manual da Marca EQS" description="Diretrizes de identidade visual e uso da marca." fileType="PDF" fileSize="8.4 MB" updatedAt="12/05/2025" />
      <DocumentCard title="Código de Conduta" description="Políticas internas e diretrizes de ética." fileType="PDF" fileSize="1.2 MB" updatedAt="12/05/2025" />
    </div>
  ),
};
