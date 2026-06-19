import type { Meta, StoryObj } from '@storybook/react';
import { AuthCard } from './AuthCard';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { Feedback } from '../Feedback/Feedback';

const meta: Meta<typeof AuthCard> = {
  title: 'Components/AuthCard',
  component: AuthCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Container de tela inteira para fluxos de autenticação. Logo centralizada e card com glass effect. Dois backgrounds disponíveis via prop `background`: `glass` (padrão, semi-transparente claro) e `glass-dark` (escuro, ideal sobre imagens).',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof AuthCard>;

// ── Backgrounds ──────────────────────────────────────────

export const GlassLight: Story = {
  name: 'Background / Glass Light',
  args: {
    title: 'Bem-vindo de volta',
    description: 'Entre na sua conta para continuar.',
    background: 'glass',
  },
  render: (args) => (
    <AuthCard {...args}>
      <Input label="E-mail" type="email" placeholder="seu@email.com" />
      <Input label="Senha" toggleable placeholder="••••••••" />
      <Button style={{ width: '100%' }}>Entrar</Button>
    </AuthCard>
  ),
};

export const GlassDark: Story = {
  name: 'Background / Glass Dark',
  args: {
    title: 'Bem-vindo de volta',
    description: 'Entre na sua conta para continuar.',
    background: 'glass-dark',
  },
  render: (args) => (
    <AuthCard {...args}>
      <Input label="E-mail" type="email" placeholder="seu@email.com" />
      <Input label="Senha" toggleable placeholder="••••••••" />
      <Button style={{ width: '100%' }}>Entrar</Button>
    </AuthCard>
  ),
};

// ── Variantes de conteúdo ────────────────────────────────

export const Default: Story = {
  args: {
    title: 'Crie sua senha',
    description: 'Defina uma senha segura para acessar o painel.',
  },
  render: (args) => (
    <AuthCard {...args}>
      <Input label="Nova senha" type="password" placeholder="••••••••" />
      <Input label="Confirmar senha" type="password" placeholder="••••••••" />
      <Button style={{ width: '100%' }}>Criar senha</Button>
    </AuthCard>
  ),
};

export const WithEmailReadOnly: Story = {
  args: {
    title: 'Crie sua senha',
    description: 'Você foi convidado para acessar o painel Althus. Defina sua senha para continuar.',
  },
  render: (args) => (
    <AuthCard {...args}>
      <Input label="E-mail" value="admin@rede.com.br" disabled readOnly />
      <Input label="Nova senha" type="password" placeholder="••••••••" />
      <Input label="Confirmar senha" type="password" placeholder="••••••••" />
      <Button style={{ width: '100%' }}>Criar senha</Button>
    </AuthCard>
  ),
};

export const WithError: Story = {
  args: {
    title: 'Crie sua senha',
    description: 'Defina uma senha segura para acessar o painel.',
  },
  render: (args) => (
    <AuthCard {...args}>
      <Feedback type="error" message="As senhas não coincidem. Tente novamente." />
      <Input label="Nova senha" type="password" placeholder="••••••••" error="Verifique sua senha." />
      <Input label="Confirmar senha" type="password" placeholder="••••••••" error="Verifique sua senha." />
      <Button style={{ width: '100%' }}>Criar senha</Button>
    </AuthCard>
  ),
};
