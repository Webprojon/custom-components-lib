import React from 'react';
import type { ButtonVariant, ComponentColor, ComponentSize } from '@/types/common';

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color' | 'size' | 'children'> {
  children: React.ReactNode;

  // Variants
  variant?: ButtonVariant;
  size?: ComponentSize;
  color?: ComponentColor;

  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  loading?: boolean;
  loadingPosition?: 'start' | 'end';
  fullWidth?: boolean;
  'aria-label'?: string;

  // Custom props
  className?: string;
  'data-testid'?: string;
}

export const defaultProps: Partial<ButtonProps> = {
  variant: 'contained',
  size: 'medium',
  color: 'primary',
  disabled: false,
  loading: false,
  loadingPosition: 'start',
  fullWidth: false,
  type: 'button',
  autoFocus: false,
};
