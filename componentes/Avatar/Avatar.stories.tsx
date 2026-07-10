import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';
import placeholder from './src/placeholder.jpg';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: { layout: 'centered' },
  argTypes: {
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
  },
};
export default meta;

type Story = StoryObj<typeof Avatar>;

export const WithInitials: Story = {
  args: { initials: 'AR', size: 'md' },
};

export const WithPhoto: Story = {
  args: {
    src: placeholder,
    alt: 'Foto de perfil',
    size: 'md',
  },
};

export const LargeInitials: Story = {
  args: { initials: 'AR', size: 'lg' },
};

export const LargePhoto: Story = {
  args: {
    src: placeholder,
    alt: 'Foto de perfil',
    size: 'lg',
  },
};

export const SmallInitials: Story = {
  args: { initials: 'AR', size: 'sm' },
};

export const SmallPhoto: Story = {
  args: {
    src: placeholder,
    alt: 'Foto de perfil',
    size: 'sm',
  },
};
