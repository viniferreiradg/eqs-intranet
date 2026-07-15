import type { Meta, StoryObj } from '@storybook/react';
import { DocumentListItem } from './DocumentListItem';

const meta: Meta<typeof DocumentListItem> = {
  title: 'Primitives/DocumentListItem',
  component: DocumentListItem,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Item de lista de arquivo para download — usado na seção "Materiais e documentos" da página de detalhe do evento.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof DocumentListItem>;

export const Default: Story = {
  args: {
    name: 'Apresentação BIM 4.0',
    meta: 'PDF · 8.4 MB',
  },
};

export const List: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)', width: 420 }}>
      <DocumentListItem name="Apresentação BIM 4.0" meta="PDF · 8.4 MB" />
      <DocumentListItem name="Guia rápido de ferramentas" meta="PDF · 3.1 MB" />
      <DocumentListItem name="Cronograma do workshop" meta="PDF · 1.2 MB" />
    </div>
  ),
};
