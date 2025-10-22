import React from 'react';

export interface ButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';

  // Variants
  variant?: 'text' | 'outlined' | 'contained';
  size?: 'small' | 'medium' | 'large';
  color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';

  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  loading?: boolean;
  loadingPosition?: 'start' | 'end';
  fullWidth?: boolean;
  'aria-label'?: string;

  // Custom props
  className?: string;
  'data-testid'?: string;
  id?: string;
  name?: string;
  value?: string;
  form?: string;
  autoFocus?: boolean;
  tabIndex?: number;
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
