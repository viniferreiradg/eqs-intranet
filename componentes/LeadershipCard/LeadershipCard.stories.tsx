import type { Meta, StoryObj } from '@storybook/react';
import { LeadershipCard } from './LeadershipCard';

const meta: Meta<typeof LeadershipCard> = {
  title: 'Components/LeadershipCard',
  component: LeadershipCard,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Foto + nome + cargo + link do LinkedIn — usado na seção "Liderança" da página Sobre.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof LeadershipCard>;

export const Default: Story = {
  render: () => (
    <div style={{ width: 260 }}>
      <LeadershipCard
        photo="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400"
        name="Marcos Aurélio"
        role="Diretor Presidente"
        linkedinHref="#"
      />
    </div>
  ),
};
