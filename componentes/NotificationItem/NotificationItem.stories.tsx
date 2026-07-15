import type { Meta, StoryObj } from '@storybook/react';
import { PartyPopper, Megaphone, Clock, UserPlus, FileText } from 'lucide-react';
import { NotificationItem, NotificationList } from './NotificationItem';

const meta: Meta<typeof NotificationItem> = {
  title: 'Primitives/NotificationItem',
  component: NotificationItem,
  tags: ['autodocs'],
  decorators: [(S) => <div style={{ width: 400 }}><S /></div>],
  parameters: {
    docs: {
      description: {
        component: 'Linha de notificação para o Sheet de notificações do painel — ícone em box tintado por tipo, dot de não lida, descrição e horário.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof NotificationItem>;

export const Default: Story = {
  args: {
    icon: Megaphone,
    status: 'info',
    title: 'Novo comunicado publicado',
    description: 'Atualização do plano de saúde a partir de janeiro.',
    time: '25 min',
    unread: true,
  },
};

export const Lista: Story = {
  render: () => (
    <NotificationList>
      <NotificationItem icon={PartyPopper} status="success" title="87 confirmações no evento" description="Confraternização EQS 2026 — 68% dos convidados." time="Agora" unread />
      <NotificationItem icon={Clock} status="warning" title="Rascunho aguardando publicação" description="SIPAT 2026 — Semana de Prevenção está como rascunho há 12 dias." time="1h" unread />
      <NotificationItem icon={UserPlus} status="info" title="Novo colaborador cadastrado" description="Larissa Campos adicionada ao setor Engenharia." time="Ontem" />
      <NotificationItem icon={FileText} title="Documento atualizado" description="Manual da Marca EQS — nova versão disponível." time="Ontem" />
    </NotificationList>
  ),
};
