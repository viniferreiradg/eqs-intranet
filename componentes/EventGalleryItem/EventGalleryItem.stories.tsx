import type { Meta, StoryObj } from '@storybook/react';
import { EventGalleryItem } from './EventGalleryItem';

const meta: Meta<typeof EventGalleryItem> = {
  title: 'Primitives/EventGalleryItem',
  component: EventGalleryItem,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Miniatura clicável de foto — usada na seção "Fotos do evento" da página de detalhe do evento. Clique abre o `Lightbox`, com navegação entre as demais fotos.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof EventGalleryItem>;

export const Default: Story = {
  args: {
    src: 'https://placehold.co/400x300/2a2a2a/eee?text=Foto',
    alt: '',
  },
};

export const Grid: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--spacing-md)', width: 600 }}>
      <EventGalleryItem src="https://placehold.co/400x300/2a2a2a/eee?text=1" />
      <EventGalleryItem src="https://placehold.co/400x300/2a2a2a/eee?text=2" />
      <EventGalleryItem src="https://placehold.co/400x300/2a2a2a/eee?text=3" />
      <EventGalleryItem src="https://placehold.co/400x300/2a2a2a/eee?text=4" />
    </div>
  ),
};
