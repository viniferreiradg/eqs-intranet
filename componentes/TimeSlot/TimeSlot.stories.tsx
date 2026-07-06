import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { TimeSlot } from './TimeSlot';

const meta: Meta<typeof TimeSlot> = {
  title: 'Mobile/TimeSlot',
  component: TimeSlot,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof TimeSlot>;

export const Available: Story = {
  args: { time: '09:00', state: 'available' },
};

export const Selected: Story = {
  args: { time: '09:00', state: 'selected' },
};

export const Unavailable: Story = {
  args: { time: '09:00', state: 'unavailable' },
};

/* Grade interativa com seleção exclusiva */
export const InteractiveGrid: Story = {
  render: () => {
    const slots = [
      { time: '08:00', unavailable: false },
      { time: '08:30', unavailable: true },
      { time: '09:00', unavailable: false },
      { time: '09:30', unavailable: false },
      { time: '10:00', unavailable: true },
      { time: '10:30', unavailable: false },
      { time: '11:00', unavailable: false },
      { time: '11:30', unavailable: true },
    ];
    const [selected, setSelected] = useState<string | null>('09:00');
    return (
      <div style={{ padding: 24, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, maxWidth: 280 }}>
        {slots.map(s => (
          <TimeSlot
            key={s.time}
            time={s.time}
            state={s.unavailable ? 'unavailable' : selected === s.time ? 'selected' : 'available'}
            onClick={() => setSelected(s.time)}
          />
        ))}
      </div>
    );
  },
};
