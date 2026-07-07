import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from './Textarea';

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Área de texto multilinha. Compartilha `.wrapper`/`.label`/`.helperText`/`.errorText`/`.successText` com Input — coexistem na mesma página.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: { label: 'Conteúdo', placeholder: 'Escreva o conteúdo da notícia...' },
};

export const WithHelperText: Story = {
  args: { label: 'Resumo', placeholder: 'Resumo curto...', helperText: 'Aparece na listagem e nos cards de notícia.' },
};

export const WithError: Story = {
  args: { label: 'Conteúdo', value: '', error: 'O conteúdo é obrigatório.' },
};

export const WithSuccess: Story = {
  args: { label: 'Conteúdo', value: 'Texto validado.', success: 'Conteúdo dentro do limite recomendado.' },
};

export const Disabled: Story = {
  args: { label: 'Conteúdo', value: 'Texto bloqueado para edição.', disabled: true },
};
