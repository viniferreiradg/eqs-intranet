import type { Meta, StoryObj } from '@storybook/react';
import { EventGalleryItem } from './EventGalleryItem';

const meta: Meta<typeof EventGalleryItem> = {
  title: 'Components/EventGalleryItem',
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
    src: '/src/hero-eventos.jpg',
    alt: '',
  },
};

export const Grid: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--spacing-md)', width: 600 }}>
      <EventGalleryItem src="/src/hero-eventos.jpg" />
      <EventGalleryItem src="/src/noticia-1.jpg" />
      <EventGalleryItem src="/src/noticia-2.jpg" />
      <EventGalleryItem src="/src/noticia-3.jpg" />
    </div>
  ),
};
