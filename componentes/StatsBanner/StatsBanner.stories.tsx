import type { Meta, StoryObj } from '@storybook/react';
import { Clock, Users, Map, ShieldCheck } from 'lucide-react';
import { StatsBanner } from './StatsBanner';

const meta: Meta<typeof StatsBanner> = {
  title: 'Primitives/StatsBanner',
  component: StatsBanner,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Banner escuro full-bleed com números de destaque — usado na seção Sobre da Home.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof StatsBanner>;

export const Default: Story = {
  args: {
    image: 'https://placehold.co/1400x400/0a0a0a/eee?text=EQS',
    kicker: 'Institucional',
    title: 'Sobre a EQS',
    description: 'A EQS Engenharia atua há mais de 20 anos em projetos de infraestrutura de precisão, unindo tecnologia e segurança para entregar obras que atendem aos mais altos padrões técnicos do setor.',
    stats: [
      { icon: Clock, value: '20+', label: 'Anos de história' },
      { icon: Users, value: '350+', label: 'Colaboradores' },
      { icon: Map, value: '18', label: 'Estados atendidos' },
      { icon: ShieldCheck, value: '7', label: 'Escritórios' },
    ],
    ctaLabel: 'Saiba mais sobre a EQS',
  },
};
