import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { CheckCheck } from 'lucide-react';
import { Sheet } from './Sheet';
import { Button } from '../Button/Button';

const meta: Meta<typeof Sheet> = {
  title: 'Components/Sheet',
  component: Sheet,
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj<typeof Sheet>;

/* ── Wrapper com estado ── */
const Controlled = (args: Partial<React.ComponentProps<typeof Sheet>>) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ padding: 32 }}>
      <Button onClick={() => setOpen(true)}>Abrir Sheet</Button>
      <Sheet
        open={open}
        onClose={() => setOpen(false)}
        title={args.title ?? 'Sheet'}
        footer={args.footer}
        width={args.width}
      >
        {args.children}
      </Sheet>
    </div>
  );
};

/* ── Notificações mock ── */
const notifs = [
  { id: 1, unread: true,  icon: '🔴', title: 'Carregador ALT-003 offline',        desc: 'Posto Shell Anhanguera perdeu conexão.',    time: 'Agora' },
  { id: 2, unread: true,  icon: '⚠️', title: 'Tarifa vence em 2 dias',            desc: 'Tarifa "Noturna Shell" expira em 27/05.',   time: '14 min' },
  { id: 3, unread: true,  icon: '🟢', title: 'Nova reserva confirmada',            desc: 'ALT-007 — Shopping Morumbi, 17h30.',        time: '1h' },
  { id: 4, unread: false, icon: '📋', title: 'Relatório mensal disponível',        desc: 'Abril/2026 pronto para download.',          time: 'Ontem' },
  { id: 5, unread: false, icon: '👤', title: 'Novo usuário cadastrado',            desc: 'Carlos Mendes adicionado como Operador.',   time: 'Ontem' },
];

const NotifList = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
    {notifs.map((n, i) => (
      <div key={n.id} style={{
        display: 'flex', gap: 12, padding: '14px 0',
        borderBottom: i < notifs.length - 1 ? '1px solid var(--color-border-subtle)' : 'none',
        opacity: n.unread ? 1 : 0.55,
      }}>
        <span style={{ fontSize: 20, flexShrink: 0, marginTop: 2 }}>{n.icon}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontSize: 'var(--font-size-sm)', fontWeight: n.unread ? 'var(--font-weight-medium)' : 'var(--font-weight-regular)',
            color: 'var(--color-text-primary)', marginBottom: 2,
          }}>
            {n.unread && <span style={{
              display: 'inline-block', width: 6, height: 6, borderRadius: '50%',
              background: 'var(--color-action-error)', marginRight: 6, verticalAlign: 'middle',
            }} />}
            {n.title}
          </div>
          <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-tertiary)' }}>{n.desc}</div>
        </div>
        <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-tertiary)', flexShrink: 0 }}>{n.time}</span>
      </div>
    ))}
  </div>
);

export const Notificacoes: Story = {
  name: 'Notificações',
  render: () => (
    <Controlled
      title="Notificações"
      width={420}
      footer={
        <Button variant="ghost" iconLeft={<CheckCheck size={15} />}>
          Marcar todas como lidas
        </Button>
      }
    >
      <NotifList />
    </Controlled>
  ),
};

export const Default: Story = {
  name: 'Genérico',
  render: () => (
    <Controlled title="Detalhes" width={400}>
      <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)', lineHeight: 1.6 }}>
        Conteúdo do Sheet. Pode ser qualquer coisa — notificações, filtros avançados, detalhes de um item.
      </p>
    </Controlled>
  ),
};

export const ComFooter: Story = {
  name: 'Com footer',
  render: () => (
    <Controlled
      title="Confirmar ação"
      width={380}
      footer={
        <>
          <Button variant="ghost">Cancelar</Button>
          <Button variant="primary">Confirmar</Button>
        </>
      }
    >
      <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)', lineHeight: 1.6 }}>
        Use o footer para ações primárias e secundárias.
      </p>
    </Controlled>
  ),
};

export const Largo: Story = {
  name: 'Largo (600px)',
  render: () => (
    <Controlled title="Sheet largo" width={600}>
      <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
        Largura customizável via prop <code>width</code>.
      </p>
    </Controlled>
  ),
};
