import React from 'react';

export type CheckboxSize = 'small' | 'medium' | 'large';
export type CheckboxColor = 'primary' | 'secondary' | 'error' | 'success' | 'info' | 'warning';
export type CheckboxLabelPlacement = 'start' | 'end';

export interface BaseInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'size' | 'color' | 'checked' | 'defaultChecked' | 'onChange'
  > {}

export interface CheckboxProps {
  id?: string;
  name?: string;
  value?: string | number | readonly string[];
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  disabled?: boolean;
  required?: boolean;
  indeterminate?: boolean;
  label?: React.ReactNode;
  labelPlacement?: CheckboxLabelPlacement;
  color?: CheckboxColor;
  size?: CheckboxSize;
  className?: string;
  'data-testid'?: string;
  inputRef?: React.RefCallback<HTMLInputElement>;
  inputProps?: BaseInputProps;
}

export const defaultProps: Required<
  Pick<
    CheckboxProps,
    'disabled' | 'required' | 'indeterminate' | 'labelPlacement' | 'color' | 'size'
  >
> = {
  disabled: false,
  required: false,
  indeterminate: false,
  labelPlacement: 'end',
  color: 'primary',
  size: 'medium',
};
