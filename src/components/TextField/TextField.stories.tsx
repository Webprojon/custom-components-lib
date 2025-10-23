import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { TextField } from './TextField';
import type { TextFieldProps } from './TextField.types';

const meta: Meta<TextFieldProps> = {
  title: 'Components/TextField',
  component: TextField,
  tags: ['autodocs'],
  args: {
    label: 'Label',
    placeholder: 'Enter text',
    helperText: 'Helper text',
    size: 'medium',
    color: 'primary',
    variant: 'outlined',
    disabled: false,
    error: false,
    fullWidth: false,
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['small', 'medium', 'large'] },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'info', 'warning', 'error'],
    },
    variant: { control: 'radio', options: ['outlined', 'filled', 'standard'] },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'search', 'tel', 'url'],
    },
    onChange: { action: 'changed' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Text input with floating label, variants, sizes, adornments, error/helper text, and multiline support.',
      },
    },
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<TextFieldProps>;

export const Playground: Story = {};

export const Variants: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 16, gridAutoFlow: 'row' }}>
      <TextField {...args} variant="outlined" label="Outlined" />
      <TextField {...args} variant="filled" label="Filled" />
      <TextField {...args} variant="standard" label="Standard" />
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 16, gridAutoFlow: 'row' }}>
      <TextField {...args} size="small" label="Small" />
      <TextField {...args} size="medium" label="Medium" />
      <TextField {...args} size="large" label="Large" />
    </div>
  ),
};

export const Colors: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 16, flexDirection: 'row' }}>
      <TextField {...args} color="primary" label="Primary" />
      <TextField {...args} color="secondary" label="Secondary" />
      <TextField {...args} color="success" label="Success" />
      <TextField {...args} color="info" label="Info" />
      <TextField {...args} color="warning" label="Warning" />
      <TextField {...args} color="error" label="Error" />
    </div>
  ),
};

export const WithAdornments: Story = {
  args: {
    startAdornment: <span>🔍</span>,
    endAdornment: <span>📍</span>,
  },
};

export const Multiline: Story = {
  args: {
    multiline: true,
    rows: 4,
    placeholder: 'Write a message...',
  },
};

export const Controlled: Story = {
  render: (args) => {
    function ControlledDemo() {
      const [value, setValue] = useState<string>('Hello');
      return (
        <TextField
          {...args}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          label="Controlled"
        />
      );
    }
    return <ControlledDemo />;
  },
};
