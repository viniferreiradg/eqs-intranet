import type { Meta, StoryObj } from '@storybook/react';
import { DetailGrid, DetailCard, TitleRow } from './DetailCard';

const meta: Meta = {
  title: 'Primitives/DetailCard',
  parameters: {
    layout: 'padded',
    backgrounds: { default: 'dark' },
  },
};

export default meta;

// ── Helper: badge simples inline para os exemplos ────────────────────────────
const Badge = ({ label, status }: { label: string; status: string }) => (
  <span className="badge" data-status={status}>
    <span className="badgeDot" />
    {label}
  </span>
);

// ── Story: Documento ──────────────────────────────────────────────────────────
export const Documento: StoryObj = {
  render: () => (
    <div style={{ maxWidth: 860 }}>
      <TitleRow title="Manual da Marca EQS" badge={<Badge label="Publicado" status="success" />} />
      <div style={{ marginTop: 'var(--spacing-md)' }}>
        <DetailGrid>
          <DetailCard
            title="Identificação"
            items={[
              { label: 'Categoria', value: 'Institucional' },
              { label: 'Formato',   value: 'PDF', variant: 'mono' },
              { label: 'Tamanho',   value: '8.4 MB' },
            ]}
          />
          <DetailCard
            title="Publicação"
            items={[
              { label: 'Setor responsável',    value: 'Marketing' },
              { label: 'Data de publicação',   value: '12/05/2025' },
              { label: 'Última atualização',   value: '20/06/2026' },
            ]}
          />
          <DetailCard
            title="Visibilidade"
            full
            items={[
              { label: 'Acesso',      value: 'Todos os colaboradores' },
              { label: 'Downloads',   value: '348' },
              { label: 'Observação',  value: '—', variant: 'dim' },
            ]}
          />
        </DetailGrid>
      </div>
    </div>
  ),
};

// ── Story: Colaborador ────────────────────────────────────────────────────────
export const Colaborador: StoryObj = {
  render: () => (
    <div style={{ maxWidth: 860 }}>
      <TitleRow title="Juliana Mendes" badge={<Badge label="Ativo" status="success" />} />
      <div style={{ marginTop: 'var(--spacing-md)' }}>
        <DetailGrid>
          <DetailCard
            title="Dados pessoais"
            items={[
              { label: 'Cargo',  value: 'Analista de Marketing Pleno' },
              { label: 'E-mail', value: 'juliana.mendes@eqs.com.br' },
              { label: 'Setor',  value: 'Marketing' },
            ]}
          />
          <DetailCard
            title="Vínculo"
            items={[
              { label: 'Matrícula',        value: 'EQS-00482', variant: 'mono' },
              { label: 'Data de admissão', value: '03/02/2022' },
              { label: 'Status',           value: <Badge label="Ativo" status="success" /> },
            ]}
          />
        </DetailGrid>
      </div>
    </div>
  ),
};

// ── Story: variantes de valor ─────────────────────────────────────────────────
export const VariantesDeValor: StoryObj = {
  name: 'Variantes de valor',
  render: () => (
    <div style={{ maxWidth: 500 }}>
      <DetailGrid>
        <DetailCard
          title="Todas as variantes"
          full
          items={[
            { label: 'Default',  value: 'Texto padrão' },
            { label: 'Mono',     value: 'EQS-00482', variant: 'mono' },
            { label: 'Dim',      value: '—', variant: 'dim' },
            { label: 'Strong',   value: '348', variant: 'strong' },
          ]}
        />
      </DetailGrid>
    </div>
  ),
};
