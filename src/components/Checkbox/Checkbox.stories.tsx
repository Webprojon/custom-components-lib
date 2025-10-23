import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Checkbox } from './Checkbox';
import type { CheckboxProps } from './Checkbox.types';

const meta: Meta<CheckboxProps> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  args: {
    label: 'Accept terms',
    color: 'primary',
    size: 'medium',
    disabled: false,
    required: false,
    indeterminate: false,
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
        component:
          'A controlled/uncontrolled checkbox with indeterminate and label placement support.',
      },
    },
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<CheckboxProps>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Checkbox {...args} size="small" label="Small" />
      <Checkbox {...args} size="medium" label="Medium" />
      <Checkbox {...args} size="large" label="Large" />
    </div>
  ),
};

export const Colors: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
      <Checkbox {...args} color="primary" defaultChecked label="Primary" />
      <Checkbox {...args} color="secondary" defaultChecked label="Secondary" />
      <Checkbox {...args} color="success" defaultChecked label="Success" />
      <Checkbox {...args} color="info" defaultChecked label="Info" />
      <Checkbox {...args} color="warning" defaultChecked label="Warning" />
      <Checkbox {...args} color="error" defaultChecked label="Error" />
    </div>
  ),
};

export const LabelPlacement: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Checkbox {...args} labelPlacement="start" label="Start label" />
      <Checkbox {...args} labelPlacement="end" label="End label" />
    </div>
  ),
};

export const States: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Checkbox {...args} defaultChecked label="Default checked" />
      <Checkbox {...args} indeterminate label="Indeterminate" />
      <Checkbox {...args} disabled label="Disabled" />
    </div>
  ),
};

const ControlledExample: React.FC<CheckboxProps> = (args) => {
  const [checked, setChecked] = useState<boolean>(true);
  return (
    <Checkbox
      {...args}
      checked={checked}
      onChange={(e, c) => setChecked(c)}
      label={checked ? 'Checked' : 'Unchecked'}
    />
  );
};

export const Controlled: Story = {
  render: (args) => <ControlledExample {...args} />,
};
