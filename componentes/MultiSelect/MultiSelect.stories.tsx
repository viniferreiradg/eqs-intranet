import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { MultiSelect } from './MultiSelect';
import avatarPlaceholder from '../Avatar/src/placeholder.jpg';

const pessoaOptions = [
  { label: 'Ana Ribeiro',    value: 'ana',    avatar: avatarPlaceholder },
  { label: 'Bruno Costa',    value: 'bruno',  avatar: avatarPlaceholder },
  { label: 'Carla Mendes',   value: 'carla',  avatar: avatarPlaceholder },
  { label: 'Diego Ferreira', value: 'diego',  avatar: avatarPlaceholder },
  { label: 'Elisa Ramos',    value: 'elisa',  avatar: avatarPlaceholder },
];

const carregadorOptions = [
  { label: 'ALT-001 — ABB Terra 54 · Shopping Iguatemi SP',      value: 'alt-001' },
  { label: 'ALT-002 — WEG EVCS-W22 · Posto Shell Anhanguera',    value: 'alt-002' },
  { label: 'ALT-003 — Schneider EVlink · Estac. Vila Olímpia',   value: 'alt-003' },
  { label: 'ALT-004 — ABB Terra 54 · Shopping Morumbi',          value: 'alt-004' },
  { label: 'ALT-005 — Siemens VersiCharge · Aeroporto Congonhas', value: 'alt-005' },
];

const localidadeOptions = [
  { label: 'Shopping Iguatemi SP',      value: 'iguatemi'    },
  { label: 'Posto Shell Anhanguera',    value: 'shell'       },
  { label: 'Estac. Vila Olímpia',       value: 'vila-olimpia' },
  { label: 'Shopping Morumbi',          value: 'morumbi'     },
  { label: 'Aeroporto de Congonhas',    value: 'congonhas'   },
];

const meta: Meta<typeof MultiSelect> = {
  title: 'Primitives/MultiSelect',
  component: MultiSelect,
  tags: ['autodocs'],
  decorators: [(S) => <div style={{ width: 400, paddingBottom: 280 }}><S /></div>],
};
export default meta;
type Story = StoryObj<typeof MultiSelect>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([]);
    return (
      <MultiSelect
        label="Carregadores"
        options={carregadorOptions}
        value={value}
        onChange={setValue}
        placeholder="Selecione os carregadores"
      />
    );
  },
};

export const ComSeleção: Story = {
  render: () => {
    const [value, setValue] = useState(['alt-001', 'alt-003']);
    return (
      <MultiSelect
        label="Carregadores"
        options={carregadorOptions}
        value={value}
        onChange={setValue}
        placeholder="Selecione os carregadores"
      />
    );
  },
};

export const ComErro: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([]);
    return (
      <MultiSelect
        label="Localidade"
        options={localidadeOptions}
        value={value}
        onChange={setValue}
        placeholder="Selecione as localidades"
        error="Selecione pelo menos uma localidade"
      />
    );
  },
};

export const ComTextoAuxiliar: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([]);
    return (
      <MultiSelect
        label="Localidade"
        options={localidadeOptions}
        value={value}
        onChange={setValue}
        placeholder="Selecione as localidades"
        helperText="A tarifa será aplicada em todas as localidades selecionadas"
      />
    );
  },
};

export const ComAvatares: Story = {
  render: () => {
    const [value, setValue] = useState(['ana', 'bruno']);
    return (
      <MultiSelect
        label="Colaboradores"
        options={pessoaOptions}
        value={value}
        onChange={setValue}
        placeholder="Selecione os colaboradores"
      />
    );
  },
};

export const AbrindoParaCima: Story = {
  decorators: [(S) => <div style={{ paddingTop: 280 }}><S /></div>],
  render: () => {
    const [value, setValue] = useState<string[]>([]);
    return (
      <MultiSelect
        label="Colaboradores"
        options={pessoaOptions}
        value={value}
        onChange={setValue}
        placeholder="Selecione os colaboradores"
        dropUp
      />
    );
  },
};

export const Buscavel: Story = {
  name: 'Com busca (searchable)',
  render: () => {
    const [value, setValue] = useState<string[]>([]);
    return (
      <MultiSelect
        label="Colaboradores"
        options={pessoaOptions}
        value={value}
        onChange={setValue}
        placeholder="Selecione os colaboradores"
        searchable
        searchPlaceholder="Buscar colaborador..."
        helperText="Use quando a lista de opções for grande — filtra por nome ao digitar."
      />
    );
  },
};

export const Desabilitado: Story = {
  render: () => (
    <MultiSelect
      label="Carregadores"
      options={carregadorOptions}
      value={['alt-001']}
      placeholder="Selecione os carregadores"
      disabled
    />
  ),
};
