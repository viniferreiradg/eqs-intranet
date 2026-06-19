import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';

const meta: Meta<typeof Modal> = {
  title: 'Mobile/Modal',
  component: Modal,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div style={{
        width: '393px',
        height: '852px',
        margin: '0 auto',
        background: 'var(--color-bg-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--spacing-md)',
      }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const ComFechar: Story = {
  name: 'Com fechar',
  args: {
    title: 'Junte-se a nós',
    onClose: () => alert('fechar'),
    children: <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>Conteúdo do modal aqui.</p>,
  },
};

export const ComVoltarEFechar: Story = {
  name: 'Com voltar e fechar',
  args: {
    title: 'Verificação',
    onBack: () => alert('voltar'),
    onClose: () => alert('fechar'),
    children: <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>Conteúdo do modal aqui.</p>,
  },
};

export const SomenteFechar: Story = {
  name: 'Somente fechar',
  args: {
    title: 'Detalhes',
    onClose: () => alert('fechar'),
    children: <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>Conteúdo do modal aqui.</p>,
  },
};

export const SemBotoes: Story = {
  name: 'Sem botões',
  args: {
    title: 'Informação',
    children: <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>Conteúdo do modal aqui.</p>,
  },
};
