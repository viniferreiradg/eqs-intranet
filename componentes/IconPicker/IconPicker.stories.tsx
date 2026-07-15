import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { IconPicker } from './IconPicker';

const meta: Meta<typeof IconPicker> = {
  title: 'Primitives/IconPicker',
  component: IconPicker,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Seletor de ícone Lucide — trigger com visual de Dropdown (ícone selecionado em box outline + nome) que abre uma grade com os principais ícones. Usado no formulário de comunicados do painel-adm.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof IconPicker>;

function ControlledPicker(props: { initial?: string }) {
  const [value, setValue] = useState<string | undefined>(props.initial);
  return (
    <div style={{ width: 320, minHeight: 320 }}>
      <IconPicker label="Ícone" value={value} onChange={setValue} />
    </div>
  );
}

export const Default: Story = {
  render: () => <ControlledPicker initial="megaphone" />,
};

export const SemSelecao: Story = {
  render: () => <ControlledPicker />,
};
