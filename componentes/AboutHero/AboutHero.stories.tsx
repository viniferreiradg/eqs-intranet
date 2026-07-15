import type { Meta, StoryObj } from '@storybook/react';
import { Calendar, Users, MapPin, Building2 } from 'lucide-react';
import { AboutHero } from './AboutHero';

const meta: Meta<typeof AboutHero> = {
  title: 'Primitives/AboutHero',
  component: AboutHero,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Bloco de topo da página Sobre — texto+CTA à esquerda, foto com card de estatísticas flutuando sobre a borda inferior à direita. Diferente do `Hero` (full-bleed, texto sobre a foto).',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof AboutHero>;

export const Default: Story = {
  render: () => (
    <div style={{ maxWidth: 1136, paddingBottom: 32 }}>
      <AboutHero
        kicker="Sobre a EQS"
        title="Construindo o futuro com engenharia, inovação e compromisso"
        description="Há mais de 20 anos, a EQS Engenharia entrega soluções inteligentes e seguras para os desafios mais complexos de infraestrutura e construções industriais em todo o Brasil."
        ctaLabel="Conheça nossa história"
        image="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200"
        stats={[
          { icon: Calendar, value: '20+', label: 'Anos de história' },
          { icon: Users, value: '350+', label: 'Colaboradores' },
          { icon: MapPin, value: '18', label: 'Estados atendidos' },
          { icon: Building2, value: '7', label: 'Escritórios' },
        ]}
      />
    </div>
  ),
};
