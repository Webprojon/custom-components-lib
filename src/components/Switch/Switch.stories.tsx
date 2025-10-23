import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Switch } from './Switch';
import type { SwitchProps } from './Switch.types';

const meta: Meta<SwitchProps> = {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs'],
  args: {
    label: 'Enable notifications',
    color: 'primary',
    size: 'medium',
    disabled: false,
    labelPlacement: 'end',
  },
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'info', 'warning', 'error'],
    },
    size: { control: 'inline-radio', options: ['small', 'medium', 'large'] },
    labelPlacement: { control: 'inline-radio', options: ['start', 'end'] },
    onChange: { action: 'changed' },
  },
  parameters: {
    docs: {
      description: {
        component: 'Accessible toggle switch with sizes, colors, and label placement.',
      },
    },
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<SwitchProps>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Switch {...args} size="small" defaultChecked label="Small" />
      <Switch {...args} size="medium" defaultChecked label="Medium" />
      <Switch {...args} size="large" defaultChecked label="Large" />
    </div>
  ),
};

export const Colors: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
      <Switch {...args} color="primary" defaultChecked label="Primary" />
      <Switch {...args} color="secondary" defaultChecked label="Secondary" />
      <Switch {...args} color="success" defaultChecked label="Success" />
      <Switch {...args} color="info" defaultChecked label="Info" />
      <Switch {...args} color="warning" defaultChecked label="Warning" />
      <Switch {...args} color="error" defaultChecked label="Error" />
    </div>
  ),
};

export const LabelPlacement: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Switch {...args} labelPlacement="start" label="Start label" />
      <Switch {...args} labelPlacement="end" label="End label" />
    </div>
  ),
};

export const Controlled: Story = {
  render: (args) => {
    function ControlledDemo() {
      const [checked, setChecked] = useState<boolean>(false);
      return (
        <Switch
          {...args}
          checked={checked}
          onChange={(e, c) => setChecked(c)}
          label={checked ? 'On' : 'Off'}
        />
      );
    }
    return <ControlledDemo />;
  },
};
