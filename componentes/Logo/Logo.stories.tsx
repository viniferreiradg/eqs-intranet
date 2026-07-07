import type { Meta, StoryObj } from '@storybook/react';
import { Logo, LogoSymbol } from './Logo';

const meta: Meta<typeof Logo> = {
  title: 'Components/Logo',
  component: Logo,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg', 'xl'] },
    width: { control: 'number' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A marca EQS Engenharia. Arte colorida fixa (não usa `currentColor`) — a imagem correta ' +
          'para cada tema é trocada automaticamente via `[data-theme]`, sem nenhuma prop adicional.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Logo>;

export const Default: Story = {
  args: { size: 'md' },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)', alignItems: 'flex-start' }}>
      {(['sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <div key={size} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
          <Logo size={size} />
          <span style={{ color: 'var(--color-text-secondary)', fontSize: 12, fontFamily: 'var(--font-mono)' }}>
            {size} — {size === 'sm' ? 80 : size === 'md' ? 160 : size === 'lg' ? 240 : 360}px
          </span>
        </div>
      ))}
    </div>
  ),
};

export const OnBothThemes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
      <div
        data-theme="light"
        style={{
          background: '#ffffff',
          padding: 'var(--spacing-lg)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-border-subtle)',
        }}
      >
        <Logo size="lg" />
        <p style={{ color: '#666', fontSize: 12, marginTop: 8, fontFamily: 'var(--font-mono)' }}>
          data-theme=&quot;light&quot; → logo-light.png
        </p>
      </div>

      <div
        data-theme="dark"
        style={{
          background: '#0a0a0a',
          padding: 'var(--spacing-lg)',
          borderRadius: 'var(--radius-md)',
        }}
      >
        <Logo size="lg" />
        <p style={{ color: '#999', fontSize: 12, marginTop: 8, fontFamily: 'var(--font-mono)' }}>
          data-theme=&quot;dark&quot; → logo-dark.png
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A troca de imagem acontece via CSS (`[data-theme="dark"] .logoDefault`), sem JS.',
      },
    },
  },
};

export const Symbol: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)', alignItems: 'flex-start' }}>
      <p style={{ color: 'var(--color-text-secondary)', fontSize: 13, fontFamily: 'var(--font-body)' }}>
        Versão usada quando o espaço horizontal é reduzido (ex: sidebar minimizada).{' '}
        <strong>Ainda não existe um ícone isolado da marca</strong> — por ora reaproveita a logo completa
        em tamanho reduzido; trocar assim que houver uma arte de símbolo dedicada.
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-xl)', flexWrap: 'wrap' }}>
        {(['sm', 'md', 'lg', 'xl'] as const).map((size) => (
          <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <LogoSymbol size={size} />
            <span style={{ color: 'var(--color-text-tertiary)', fontSize: 11, fontFamily: 'var(--font-mono)' }}>
              {size}
            </span>
          </div>
        ))}
      </div>
    </div>
  ),
};
