import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Lightbox } from './Lightbox';

const meta: Meta<typeof Lightbox> = {
  title: 'Components/Lightbox',
  component: Lightbox,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Visualizador de imagem em tela cheia com navegação entre fotos (setas, teclado) — aberto ao clicar num `EventGalleryItem`.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Lightbox>;

const IMAGES = ['/src/hero-eventos.jpg', '/src/noticia-1.jpg', '/src/noticia-2.jpg'];

export const Default: Story = {
  render: () => {
    function Demo() {
      const [index, setIndex] = useState(0);
      return (
        <Lightbox
          images={IMAGES}
          index={index}
          onClose={() => {}}
          onPrev={() => setIndex((i) => (i - 1 + IMAGES.length) % IMAGES.length)}
          onNext={() => setIndex((i) => (i + 1) % IMAGES.length)}
        />
      );
    }
    return <Demo />;
  },
};
