import type { Meta, StoryObj } from '@storybook/react';
import { Megaphone } from 'lucide-react';
import { DepartmentDetailCard } from './DepartmentDetailCard';

const meta: Meta<typeof DepartmentDetailCard> = {
  title: 'Components/DepartmentDetailCard',
  component: DepartmentDetailCard,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Card completo de área/departamento — usado na página "Setores". Lista todos os colaboradores (sem "ver todos") e inclui um texto de resumo da área.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof DepartmentDetailCard>;

export const Default: Story = {
  render: () => (
    <div style={{ maxWidth: 1136 }}>
      <DepartmentDetailCard
        icon={Megaphone}
        name="Marketing"
        manager={{ name: 'Camila Rocha', initials: 'CR', email: 'camila.rocha@eqs.com.br' }}
        collaborators={[
          { name: 'João Pereira', initials: 'JP', email: 'joao.pereira@eqs.com.br' },
          { name: 'Mariana Santos', initials: 'MS', email: 'mariana.santos@eqs.com.br' },
          { name: 'Felipe Lima', initials: 'FL', email: 'felipe.lima@eqs.com.br' },
          { name: 'Beatriz Alves', initials: 'BA', email: 'beatriz.alves@eqs.com.br' },
        ]}
        description="Responsável por fortalecer a marca EQS, gerar valor para o negócio e conectar nossas soluções ao mercado. Atuamos com estratégia de marca, comunicação, conteúdo, campanhas e relacionamento com o público."
      />
    </div>
  ),
};
