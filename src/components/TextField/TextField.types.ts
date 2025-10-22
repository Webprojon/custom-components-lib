import React from 'react';

export type TextFieldVariant = 'outlined' | 'filled' | 'standard';
export type TextFieldSize = 'small' | 'medium' | 'large';
export type TextFieldColor = 'primary' | 'secondary' | 'error' | 'success' | 'info' | 'warning';

export interface BaseInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'color'> {}

export interface BaseTextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size' | 'color'> {
  rows?: number;
}

export interface TextFieldProps {
  id?: string;
  name?: string;
  label?: React.ReactNode;
  placeholder?: string;
  value?: string | number;
  defaultValue?: string | number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type?: React.HTMLInputTypeAttribute;
  disabled?: boolean;
  required?: boolean;
  readOnly?: boolean;
  autoFocus?: boolean;
  autoComplete?: string;
  fullWidth?: boolean;
  size?: TextFieldSize;
  color?: TextFieldColor;
  variant?: TextFieldVariant;
  error?: boolean;
  helperText?: React.ReactNode;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  inputProps?: BaseInputProps;
  inputRef?: React.Ref<HTMLInputElement | HTMLTextAreaElement>;
  className?: string;
  'data-testid'?: string;
  multiline?: boolean;
  rows?: number;
}
export const defaultProps: Required<
  Pick<
    TextFieldProps,
    | 'disabled'
    | 'required'
    | 'readOnly'
    | 'autoFocus'
    | 'fullWidth'
    | 'size'
    | 'color'
    | 'variant'
    | 'error'
    | 'multiline'
  >
> = {
  disabled: false,
  required: false,
  readOnly: false,
  autoFocus: false,
  fullWidth: false,
  size: 'medium',
  color: 'primary',
  variant: 'outlined',
  error: false,
  multiline: false,
};
