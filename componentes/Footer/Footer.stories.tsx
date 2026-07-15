import type { Meta, StoryObj } from '@storybook/react';
import { Footer } from './Footer';

const meta: Meta<typeof Footer> = {
  title: 'Composed/Footer',
  component: Footer,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Rodapé do site institucional — logo, colunas de links rápidos e copyright.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Footer>;

export const Default: Story = {
  render: () => (
    <div style={{ width: 960 }}>
      <Footer />
    </div>
  ),
};
