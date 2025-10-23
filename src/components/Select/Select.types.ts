import React from 'react';
import type {
  FieldVariant as SelectVariant,
  ComponentSize as SelectSize,
  ComponentColor as SelectColor,
} from '@/types/common';

export type SelectValue = string | number;

export interface SelectOption<T extends SelectValue = SelectValue> {
  value: T;
  label: React.ReactNode;
  disabled?: boolean;
}

export interface BaseSelectProps<T extends SelectValue = SelectValue> {
  id?: string;
  name?: string;
  label?: React.ReactNode;
  helperText?: React.ReactNode;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  readOnly?: boolean;
  autoFocus?: boolean;
  fullWidth?: boolean;
  width?: number | string;
  size?: SelectSize;
  color?: SelectColor;
  variant?: SelectVariant;
  error?: boolean;
  className?: string;
  'data-testid'?: string;
  style?: React.CSSProperties;
  'aria-label'?: string;

  options?: Array<SelectOption<T>>;

  autoWidth?: boolean;
  multiple?: boolean;
  chipDisplay?: boolean;
  withCheckmarks?: boolean;

  renderValue?: (selected: T | T[], allOptions: Array<SelectOption<T>>) => React.ReactNode;
}

export interface UncontrolledProps<T extends SelectValue = SelectValue> {
  defaultValue?: T | T[];
  onChange?: (
    event: React.MouseEvent | React.KeyboardEvent | React.ChangeEvent,
    value: T | T[],
  ) => void;
}

export interface ControlledProps<T extends SelectValue = SelectValue> {
  value?: T | T[];
  onChange?: (
    event: React.MouseEvent | React.KeyboardEvent | React.ChangeEvent,
    value: T | T[],
  ) => void;
}

export type SelectProps<T extends SelectValue = SelectValue> = BaseSelectProps<T> &
  (UncontrolledProps<T> | ControlledProps<T>);

export const defaultProps: Required<
  Pick<
    BaseSelectProps,
    | 'disabled'
    | 'required'
    | 'readOnly'
    | 'autoFocus'
    | 'fullWidth'
    | 'size'
    | 'color'
    | 'variant'
    | 'error'
    | 'autoWidth'
    | 'multiple'
    | 'chipDisplay'
    | 'withCheckmarks'
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
  autoWidth: false,
  multiple: false,
  chipDisplay: false,
  withCheckmarks: false,
};

export type { SelectOption as Option };
