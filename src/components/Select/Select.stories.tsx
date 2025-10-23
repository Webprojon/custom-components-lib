import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Select } from './Select';
import type { SelectProps, SelectValue, Option as SelectOption } from './Select.types';

type Props<T extends SelectValue = SelectValue> = SelectProps<T>;

const baseOptions: Array<SelectOption> = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'orange', label: 'Orange' },
];

const meta: Meta<Props> = {
  title: 'Components/Select',
  component: Select as unknown as React.FC<Props>,
  tags: ['autodocs'],
  args: {
    label: 'Fruit',
    placeholder: '',
    options: baseOptions,
    size: 'medium',
    color: 'primary',
    variant: 'outlined',
    helperText: 'Choose fruit',
    error: false,
    disabled: false,
    fullWidth: false,
    withCheckmarks: true,
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['small', 'medium', 'large'] },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'info', 'warning', 'error'],
    },
    variant: { control: 'radio', options: ['outlined', 'filled', 'standard'] },
    onChange: { action: 'changed' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Accessible select with floating label, keyboard navigation, single/multiple modes, and custom renderValue.',
      },
    },
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<Props>;

export const Playground: Story = {};

export const Variants: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 16, gridAutoFlow: 'row' }}>
      <Select {...args} variant="outlined" label="Outlined" />
      <Select {...args} variant="filled" label="Filled" />
      <Select {...args} variant="standard" label="Standard" />
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 16, gridAutoFlow: 'row' }}>
      <Select {...args} size="small" label="Small" />
      <Select {...args} size="medium" label="Medium" />
      <Select {...args} size="large" label="Large" />
    </div>
  ),
};

export const Colors: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 16, gridAutoFlow: 'row' }}>
      <Select {...args} color="primary" label="Primary" />
      <Select {...args} color="secondary" label="Secondary" />
      <Select {...args} color="success" label="Success" />
      <Select {...args} color="info" label="Info" />
      <Select {...args} color="warning" label="Warning" />
      <Select {...args} color="error" label="Error" />
    </div>
  ),
};

export const Multiple: Story = {
  args: { multiple: true, chipDisplay: true, withCheckmarks: true },
};

const ControlledExample: React.FC<SelectProps<SelectValue>> = (args) => {
  const [value, setValue] = useState<SelectValue | undefined>('banana');
  return (
    <Select
      {...args}
      multiple={false}
      value={value as SelectValue}
      onChange={(e, v) => setValue(v as SelectValue)}
      label="Controlled"
    />
  );
};

export const Controlled: Story = {
  render: (args) => <ControlledExample {...args} />,
};

export const CustomRenderValue: Story = {
  render: (args) => (
    <Select
      {...args}
      multiple
      defaultValue={[baseOptions[0].value, baseOptions[1].value]}
      renderValue={(selected, all) => {
        const values = Array.isArray(selected) ? selected : [selected];
        const labels = all.filter((o) => values.includes(o.value)).map((o) => o.label);
        return (
          <span>
            {labels.map((label, idx) => (
              <span key={idx}>
                {label}
                {idx < labels.length - 1 ? ' | ' : null}
              </span>
            ))}
          </span>
        );
      }}
      label="Custom render"
    />
  ),
};
