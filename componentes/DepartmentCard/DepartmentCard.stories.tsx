import type { Meta, StoryObj } from '@storybook/react';
import { Megaphone } from 'lucide-react';
import { DepartmentCard } from './DepartmentCard';

const meta: Meta<typeof DepartmentCard> = {
  title: 'Composed/DepartmentCard',
  component: DepartmentCard,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Card de área/departamento — usado na prévia da Home e na página completa de Setores. Mostra o gestor responsável e uma pilha de avatares dos colaboradores.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof DepartmentCard>;

export const Default: Story = {
  args: {
    icon: Megaphone,
    name: 'Marketing',
    manager: { name: 'Camila Rocha', initials: 'CR' },
    collaborators: [
      { name: 'João Silva', initials: 'JS' },
      { name: 'Marina Costa', initials: 'MC' },
      { name: 'Pedro Alves', initials: 'PA' },
      { name: 'Fernanda Lima', initials: 'FL' },
      { name: 'Rafael Souza', initials: 'RS' },
      { name: 'Bianca Nogueira', initials: 'BN' },
    ],
  },
};

export const FewCollaborators: Story = {
  args: {
    icon: Megaphone,
    name: 'Marketing',
    manager: { name: 'Camila Rocha', initials: 'CR' },
    collaborators: [
      { name: 'João Silva', initials: 'JS' },
      { name: 'Marina Costa', initials: 'MC' },
    ],
  },
};
