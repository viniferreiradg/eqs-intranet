import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ImageUpload } from './ImageUpload';

const meta: Meta<typeof ImageUpload> = {
  title: 'Primitives/ImageUpload',
  component: ImageUpload,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Dropzone de imagem com preview funcional — clique ou arraste um arquivo. Sem backend: a pré-visualização usa `URL.createObjectURL`.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof ImageUpload>;

export const Default: Story = {
  render: () => {
    const [, setFile] = useState<File | null>(null);
    return <ImageUpload label="Imagem de capa" onChange={(f) => setFile(f)} />;
  },
};

export const WithError: Story = {
  args: { label: 'Imagem de capa', error: 'A imagem de capa é obrigatória.' },
};

export const Filled: Story = {
  args: {
    label: 'Imagem de capa',
    value: 'https://placehold.co/640x360/1a1a1a/eee?text=Preview',
    helperText: 'Imagem existente — visualize, altere ou remova pelas ações no canto.',
  },
};

export const LogoContain: Story = {
  args: {
    label: 'Logo',
    value: 'https://placehold.co/300x160/ffffff/2a2a2a?text=Logo',
    fit: 'contain',
    hint: 'PNG com fundo transparente, até 2MB',
    helperText: 'fit="contain" — a arte aparece inteira, sem corte, sobre fundo sutil.',
  },
};
