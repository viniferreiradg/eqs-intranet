import type { Meta, StoryObj } from '@storybook/react';
import { ContentSplit } from './ContentSplit';

const meta: Meta<typeof ContentSplit> = {
  title: 'Primitives/ContentSplit',
  component: ContentSplit,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Bloco genérico imagem + texto lado a lado — reaproveitável em páginas institucionais (ex: "Nossa história" na página Sobre). `imagePosition` alterna o lado da imagem sem duplicar o markup.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof ContentSplit>;

export const ImageLeft: Story = {
  args: {
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800',
    imagePosition: 'left',
    kicker: 'Nossa história',
    title: 'De um propósito sólido para grandes conquistas',
    paragraphs: [
      'A EQS nasceu com o propósito de transformar desafios em oportunidades, combinando conhecimento técnico, gestão eficiente e relacionamento de confiança.',
      'Ao longo dessas duas décadas, evoluímos constantemente, ampliamos nossa atuação e construímos parcerias duradouras.',
    ],
    ctaLabel: 'Linha do tempo',
  },
};

export const ImageRight: Story = {
  args: {
    ...ImageLeft.args,
    imagePosition: 'right',
  },
};
