import type { Meta, StoryObj } from '@storybook/react';
import { PartyPopper, Wrench, UtensilsCrossed, ShieldCheck, TriangleAlert } from 'lucide-react';
import { CommunicationCard } from './CommunicationCard';

const meta: Meta<typeof CommunicationCard> = {
  title: 'Primitives/CommunicationCard',
  component: CommunicationCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Card de comunicado em formato de post — ícone tintado, título, data e texto completo sempre visíveis (sem truncar, sem link de detalhe). Imagem no rodapé é opcional. Usado em grid de 2 colunas em comunicados.html.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof CommunicationCard>;

export const Default: Story = {
  args: {
    icon: PartyPopper,
    status: 'error',
    title: 'Festa Junina EQS 2026',
    date: '14 de junho de 2026',
    body: 'No dia 24 de junho, a partir das 17h, teremos nossa Festa Junina na sede da EQS Engenharia.\n\nTeremos comidas típicas, apresentações, brincadeiras e muita música boa! Participe e traga sua família.\n\nContamos com a sua presença!',
    image: 'https://placehold.co/640x360/ea580c/fff?text=Festa+Junina',
  },
};

export const SemImagem: Story = {
  name: 'Sem imagem',
  args: {
    icon: Wrench,
    status: 'warning',
    title: 'Manutenção programada no sistema financeiro',
    date: '09 de dezembro de 2026',
    body: 'O sistema financeiro passará por manutenção programada no sábado, 12 de dezembro, das 08h às 12h (horário de Brasília).\n\nDurante esse período, não será possível registrar solicitações de reembolso, consultar notas fiscais ou acessar relatórios financeiros.',
  },
};

export const ComConfirmacao: Story = {
  name: 'Com confirmação de leitura',
  args: {
    icon: TriangleAlert,
    status: 'error',
    title: 'Nova política de segurança da informação',
    date: '12 de dezembro de 2026',
    body: 'A partir de janeiro de 2027, entra em vigor a nova política de segurança da informação da EQS Engenharia. Todos os colaboradores devem revisar as diretrizes de uso de senhas, dispositivos e acesso remoto.\n\nA leitura e confirmação deste comunicado são obrigatórias.',
    requiresAck: true,
  },
};

export const Grid: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-lg)', maxWidth: 860 }}>
      <CommunicationCard
        icon={PartyPopper}
        status="error"
        title="Festa Junina EQS 2026"
        date="14 de junho de 2026"
        body="No dia 24 de junho, a partir das 17h, teremos nossa Festa Junina na sede da EQS Engenharia."
        image="https://placehold.co/640x360/ea580c/fff?text=Festa+Junina"
      />
      <CommunicationCard
        icon={Wrench}
        status="warning"
        title="Manutenção programada no sistema financeiro"
        date="09 de dezembro de 2026"
        body="O sistema financeiro passará por manutenção programada no sábado, 12 de dezembro, das 08h às 12h."
      />
      <CommunicationCard
        icon={UtensilsCrossed}
        status="info"
        title="Novo horário de funcionamento do refeitório"
        date="03 de dezembro de 2026"
        body="A partir de segunda-feira, o almoço passa a ser servido das 11h30 às 14h."
        image="https://placehold.co/640x360/0ea5e9/fff?text=Refeitorio"
      />
      <CommunicationCard
        icon={ShieldCheck}
        status="success"
        title="Campanha de vacinação contra a gripe nas unidades"
        date="01 de dezembro de 2026"
        body="A equipe médica estará disponível de 15 a 19 de dezembro em todos os escritórios."
        image="https://placehold.co/640x360/16a34a/fff?text=Vacinacao"
      />
    </div>
  ),
};
