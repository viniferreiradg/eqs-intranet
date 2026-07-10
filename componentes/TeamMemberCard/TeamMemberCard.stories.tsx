import type { Meta, StoryObj } from '@storybook/react';
import { TeamMemberCard } from './TeamMemberCard';

const meta: Meta<typeof TeamMemberCard> = {
  title: 'Components/TeamMemberCard',
  component: TeamMemberCard,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Card de colaborador — usado na seção "Nossa equipe" da página de detalhes do setor. Avatar + nome/cargo/e-mail à esquerda, botão de e-mail (outline) à direita.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof TeamMemberCard>;

export const Default: Story = {
  args: {
    name: 'João Pereira',
    role: 'Analista de Marketing Pleno',
    email: 'joao.pereira@eqs.com.br',
    initials: 'JP',
  },
};

export const SemFoto: Story = {
  args: {
    name: 'Mariana Santos',
    role: 'Especialista em Conteúdo',
    email: 'mariana.santos@eqs.com.br',
    initials: 'MS',
  },
};

export const Grid: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--spacing-md)', width: 900 }}>
      <TeamMemberCard name="João Pereira" role="Analista de Marketing Pleno" email="joao.pereira@eqs.com.br" initials="JP" />
      <TeamMemberCard name="Mariana Santos" role="Especialista em Conteúdo" email="mariana.santos@eqs.com.br" initials="MS" />
      <TeamMemberCard name="Felipe Lima" role="Designer Gráfico" email="felipe.lima@eqs.com.br" initials="FL" />
    </div>
  ),
};
