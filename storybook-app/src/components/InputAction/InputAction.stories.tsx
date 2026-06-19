import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { InputAction } from './InputAction';

const meta: Meta<typeof InputAction> = {
  title: 'Mobile/InputAction',
  component: InputAction,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Input com botão de ação embutido à direita. Usado para campos que exigem uma ação imediata após o preenchimento, como envio de código de verificação por telefone. O estado `actionSent` desabilita o botão e muda o label para "Código enviado".',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof InputAction>;

export const Default: Story = {
  name: 'Default',
  render: () => {
    const [value, setValue] = useState('');
    const [sent, setSent] = useState(false);
    return (
      <div style={{ width: 320 }}>
        <InputAction
          label="Seu número de telefone"
          placeholder="Ex.: (48) 99945-9453"
          actionLabel="Enviar código"
          value={value}
          onChange={setValue}
          actionSent={sent}
          onAction={() => setSent(true)}
        />
      </div>
    );
  },
};

export const Sent: Story = {
  name: 'Código enviado',
  render: () => (
    <div style={{ width: 320 }}>
      <InputAction
        label="Seu número de telefone"
        placeholder="Ex.: (48) 99945-9453"
        actionLabel="Enviar código"
        actionSent
        value="(48) 99999-9999"
      />
    </div>
  ),
};

export const Disabled: Story = {
  name: 'Disabled',
  render: () => (
    <div style={{ width: 320 }}>
      <InputAction
        label="Seu número de telefone"
        placeholder="Ex.: (48) 99945-9453"
        actionLabel="Enviar código"
        disabled
      />
    </div>
  ),
};
