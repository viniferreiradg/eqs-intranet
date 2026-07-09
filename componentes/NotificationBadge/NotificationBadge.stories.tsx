import type { Meta, StoryObj } from '@storybook/react';
import { Bell } from 'lucide-react';
import { NotificationBadge } from './NotificationBadge';

const meta: Meta<typeof NotificationBadge> = {
  title: 'Components/NotificationBadge',
  component: NotificationBadge,
  parameters: { layout: 'centered' },
  argTypes: {
    count: { control: 'number' },
    max:   { control: 'number' },
  },
};
export default meta;
type Story = StoryObj<typeof NotificationBadge>;

const IconBtn = ({ children }: { children: React.ReactNode }) => (
  <button
    type="button"
    style={{
      display:        'flex',
      alignItems:     'center',
      justifyContent: 'center',
      width:          32,
      height:         32,
      borderRadius:   'var(--radius-full)',
      background:     'var(--color-bg-subtle)',
      border:         '1px solid var(--color-border-subtle)',
      cursor:         'pointer',
      color:          'var(--color-text-tertiary)',
    }}
  >
    {children}
  </button>
);

const Wrapper = (args: React.ComponentProps<typeof NotificationBadge>) => (
  <NotificationBadge {...args}>
    <IconBtn><Bell size={18} /></IconBtn>
  </NotificationBadge>
);

export const Default: Story = {
  args: { count: 3 },
  render: Wrapper,
};

export const UmaNota: Story = {
  name: '1 notificação',
  args: { count: 1 },
  render: Wrapper,
};

export const NoLimite: Story = {
  name: 'No limite (9)',
  args: { count: 9, max: 9 },
  render: Wrapper,
};

export const AcimaDoLimite: Story = {
  name: 'Acima do limite → 9+',
  args: { count: 12, max: 9 },
  render: Wrapper,
};

export const SemNotificacoes: Story = {
  name: 'Sem notificações (badge oculto)',
  args: { count: 0 },
  render: Wrapper,
};

export const MaxCustomizado: Story = {
  name: 'Max customizado (99+)',
  args: { count: 150, max: 99 },
  render: Wrapper,
};
