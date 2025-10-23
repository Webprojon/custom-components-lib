import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Button } from './Button';
import type { ButtonProps } from './Button.types';

const meta: Meta<ButtonProps> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['text', 'outlined', 'contained'],
    },
    size: {
      control: 'inline-radio',
      options: ['small', 'medium', 'large'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'info', 'warning', 'error'],
    },
    loadingPosition: {
      control: 'radio',
      options: ['start', 'end'],
    },
    startIcon: { control: false },
    endIcon: { control: false },
    onClick: { action: 'clicked' },
  },
  args: {
    children: 'Button',
    variant: 'contained',
    size: 'medium',
    color: 'primary',
    disabled: false,
    loading: false,
    loadingPosition: 'start',
    fullWidth: false,
    type: 'button',
  },
  parameters: {
    docs: {
      description: {
        component:
          'A versatile button with variants, sizes, semantic colors, ripple effect, and loading state.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<ButtonProps>;

export const Playground: Story = {};

export const Variants: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      <Button {...args} variant="text">
        Text
      </Button>
      <Button {...args} variant="outlined">
        Outlined
      </Button>
      <Button {...args} variant="contained">
        Contained
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Supported variants: text, outlined, contained.',
      },
    },
  },
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
      <Button {...args} size="small">
        Small
      </Button>
      <Button {...args} size="medium">
        Medium
      </Button>
      <Button {...args} size="large">
        Large
      </Button>
    </div>
  ),
};

export const Colors: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      <Button {...args} color="primary">
        Primary
      </Button>
      <Button {...args} color="secondary">
        Secondary
      </Button>
      <Button {...args} color="success">
        Success
      </Button>
      <Button {...args} color="info">
        Info
      </Button>
      <Button {...args} color="warning">
        Warning
      </Button>
      <Button {...args} color="error">
        Error
      </Button>
    </div>
  ),
};

export const WithIcons: Story = {
  args: {
    startIcon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 14.59L8.41 12 13 7.41 14.41 8.83 11.24 12l3.17 3.17L13 16.59z" />
      </svg>
    ),
    endIcon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm-1 14.59L15.59 12 11 7.41 9.59 8.83 12.76 12l-3.17 3.17L11 16.59z" />
      </svg>
    ),
  },
  render: (args) => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
      <Button {...args}>With start + end icons</Button>
      <Button {...args} startIcon={args.startIcon} endIcon={undefined}>
        Start icon
      </Button>
      <Button {...args} startIcon={undefined} endIcon={args.endIcon}>
        End icon
      </Button>
    </div>
  ),
};

export const Loading: Story = {
  args: {
    loading: true,
    children: 'Loading...',
  },
  render: (args) => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      <Button {...args} loadingPosition="start">
        Start
      </Button>
      <Button {...args} loadingPosition="end">
        End
      </Button>
      <Button {...args} disabled>
        Disabled & Loading
      </Button>
    </div>
  ),
};

export const FullWidth: Story = {
  args: { fullWidth: true },
  render: (args) => (
    <div style={{ width: 400 }}>
      <Button {...args}>Full width</Button>
    </div>
  ),
};

export const Accessibility: Story = {
  args: {
    'aria-label': 'Accessible Button',
    children: 'Aria labeled button',
  },
};
