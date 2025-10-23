import React from 'react';

export type SwitchSize = 'small' | 'medium' | 'large';
export type SwitchColor = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error';
export type SwitchLabelPlacement = 'start' | 'end';

export interface BaseInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'size' | 'color' | 'checked' | 'defaultChecked' | 'onChange'
  > {}

export interface SwitchProps {
  id?: string;
  name?: string;
  value?: string | number | readonly string[];
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  disabled?: boolean;
  size?: SwitchSize;
  color?: SwitchColor;
  label?: React.ReactNode;
  labelPlacement?: SwitchLabelPlacement;
  className?: string;
  'data-testid'?: string;
  inputRef?: React.RefCallback<HTMLInputElement>;
  inputProps?: BaseInputProps;
  style?: React.CSSProperties;
}

export const defaultProps: Required<
  Pick<SwitchProps, 'disabled' | 'size' | 'color' | 'labelPlacement'>
> = {
  disabled: false,
  size: 'medium',
  color: 'primary',
  labelPlacement: 'end',
};
