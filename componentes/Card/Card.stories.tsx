import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';

const meta: Meta<typeof Card> = {
  title: 'Primitives/Card',
  component: Card,
  parameters: { layout: 'centered' },
};
export default meta;

type Story = StoryObj<typeof Card>;

const SampleContent = () => (
  <div style={{ padding: '24px', minWidth: 320 }}>
    <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--color-text-primary)' }}>
      Conteúdo do card
    </p>
  </div>
);

export const Default: Story = {
  args: {
    variant: 'default',
    children: <SampleContent />,
  },
};

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    children: <SampleContent />,
  },
};

export const WithForm: Story = {
  args: {
    children: (
      <div style={{ padding: '24px', minWidth: 480 }}>
        <h2 style={{ margin: '0 0 8px', fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 600, color: 'var(--color-text-primary)' }}>
          Seção do formulário
        </h2>
        <p style={{ margin: 0, fontSize: 14, color: 'var(--color-text-tertiary)' }}>
          Descrição da seção
        </p>
      </div>
    ),
  },
};
