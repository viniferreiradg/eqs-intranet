import type { Meta, StoryObj } from '@storybook/react';
import { CreditCard } from './CreditCard';

const meta: Meta<typeof CreditCard> = {
  title: 'Mobile/CreditCard',
  component: CreditCard,
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div style={{ width: 300 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof CreditCard>;

export const Default: Story = {
  args: {
    number: '●●● ●●● ●●● 7032',
    holderName: 'Lucas Andrade',
    brand: 'Elo',
  },
};

export const WithDelete: Story = {
  args: {
    number: '●●● ●●● ●●● 7032',
    holderName: 'Lucas Andrade',
    brand: 'Elo',
    onDelete: () => alert('Remover cartão'),
  },
};

export const Visa: Story = {
  args: {
    number: '●●● ●●● ●●● 4242',
    holderName: 'Carlos Silva',
    brand: 'Visa',
    onDelete: () => {},
  },
};
