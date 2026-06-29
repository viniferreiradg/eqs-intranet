import type { Meta, StoryObj } from '@storybook/react';
import { ChargerPin } from './ChargerPin';

const meta: Meta<typeof ChargerPin> = {
  title: 'Mobile/ChargerPin',
  component: ChargerPin,
  parameters: { layout: 'centered', backgrounds: { default: 'dark' } },
  tags: ['autodocs'],
  argTypes: {
    chargers: { control: false },
    size:     { control: { type: 'range', min: 32, max: 120, step: 4 } },
  },
};
export default meta;

type Story = StoryObj<typeof ChargerPin>;

const label = (s: string) => (
  <div style={{ textAlign: 'center' }}>
    <span style={{ display: 'block', fontSize: 11, color: 'var(--color-text-tertiary)', marginTop: 8 }}>{s}</span>
  </div>
);

export const Default: Story = {
  args: { chargers: ['available', 'available'], size: 56 },
};

export const SingleCharger: Story = {
  name: '1 Carregador',
  render: () => (
    <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>
      <div>
        <ChargerPin chargers={['available']} />
        {label('livre')}
      </div>
      <div>
        <ChargerPin chargers={['occupied']} />
        {label('ocupado')}
      </div>
    </div>
  ),
};

export const TwoChargers: Story = {
  name: '2 Carregadores',
  render: () => (
    <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>
      <div>
        <ChargerPin chargers={['available', 'available']} />
        {label('2 livres')}
      </div>
      <div>
        <ChargerPin chargers={['occupied', 'available']} />
        {label('1 ocu · 1 livre')}
      </div>
      <div>
        <ChargerPin chargers={['occupied', 'occupied']} />
        {label('2 ocupados')}
      </div>
    </div>
  ),
};

export const ThreeChargers: Story = {
  name: '3 Carregadores',
  render: () => (
    <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>
      <div>
        <ChargerPin chargers={['available', 'available', 'available']} />
        {label('3 livres')}
      </div>
      <div>
        <ChargerPin chargers={['available', 'occupied', 'occupied']} />
        {label('1 livre · 2 ocu')}
      </div>
      <div>
        <ChargerPin chargers={['occupied', 'occupied', 'occupied']} />
        {label('3 ocupados')}
      </div>
    </div>
  ),
};

export const FourChargers: Story = {
  name: '4 Carregadores',
  render: () => (
    <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>
      <div>
        <ChargerPin chargers={['available', 'available', 'available', 'available']} />
        {label('4 livres')}
      </div>
      <div>
        <ChargerPin chargers={['available', 'occupied', 'available', 'occupied']} />
        {label('2 livres · 2 ocu')}
      </div>
      <div>
        <ChargerPin chargers={['occupied', 'occupied', 'occupied', 'occupied']} />
        {label('4 ocupados')}
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      <ChargerPin chargers={['available', 'occupied']} size={32} />
      <ChargerPin chargers={['available', 'occupied']} size={44} />
      <ChargerPin chargers={['available', 'occupied']} size={56} />
      <ChargerPin chargers={['available', 'occupied']} size={72} />
      <ChargerPin chargers={['available', 'occupied']} size={96} />
    </div>
  ),
};
