import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import type { SelectValue, SelectOption } from './Select.types';

const toArray = <T>(value: T | T[] | undefined | null): T[] => {
  if (value === undefined || value === null) return [];
  return Array.isArray(value) ? value : [value];
};

const getKey = (v: unknown): string => {
  if (v === null || v === undefined) return '';
  const type = typeof v;
  if (type === 'string' || type === 'number' || type === 'boolean') {
    return String(v as string | number | boolean);
  }
  try {
    return JSON.stringify(v);
  } catch {
    return '';
  }
};

export interface UseSelectReturn<T extends SelectValue> {
  isOpen: boolean;
  isFocused: boolean;
  highlightedIndex: number;
  setHighlightedIndex: React.Dispatch<React.SetStateAction<number>>;
  setIsFocused: React.Dispatch<React.SetStateAction<boolean>>;
  openMenu: () => void;
  closeMenu: () => void;
  handleKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  toggleValueInMultiple: (event: React.MouseEvent | React.KeyboardEvent, optionValue: T) => void;
  selectSingleValue: (event: React.MouseEvent | React.KeyboardEvent, v: T) => void;
  selectedValuesArray: T[];
  selectedSet: Set<string>;
  hasValue: boolean;
  menuStyle: React.CSSProperties;
  rootRef: React.RefObject<HTMLDivElement>;
  buttonRef: React.RefObject<HTMLDivElement>;
  hiddenInputValue: string | undefined;
}

export interface UseSelectArgs<T extends SelectValue> {
  name?: string;
  options: Array<SelectOption<T>>;
  multiple?: boolean;
  autoWidth?: boolean;
  autoFocus?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  value?: T | T[] | undefined;
  defaultValue?: T | T[] | undefined;
  onChange?: (
    event: React.MouseEvent | React.KeyboardEvent | React.ChangeEvent,
    value: T | T[],
  ) => void;
}

export function useSelect<T extends SelectValue = SelectValue>(
  args: UseSelectArgs<T>,
): UseSelectReturn<T> {
  const {
    name,
    options,
    multiple = false,
    autoWidth = false,
    autoFocus = false,
    readOnly = false,
    disabled = false,
    value: controlledValueProp,
    defaultValue: defaultValueProp,
    onChange,
  } = args;

  const isControlled = controlledValueProp !== undefined;

  const [internalValue, setInternalValue] = useState<T | T[] | undefined>(defaultValueProp);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const [menuStyle, setMenuStyle] = useState<React.CSSProperties>({});

  const rootRef = useRef<HTMLDivElement>(null!);
  const buttonRef = useRef<HTMLDivElement>(null!);

  const selectedValue: T | T[] | undefined = isControlled ? controlledValueProp : internalValue;

  const selectedValuesArray = useMemo(() => toArray<T>(selectedValue), [selectedValue]);
  const selectedSet = useMemo(
    () => new Set(selectedValuesArray.map(getKey)),
    [selectedValuesArray],
  );

  const hasValue = useMemo(() => {
    if (multiple) return selectedValuesArray.length > 0;
    if (selectedValuesArray.length === 0) return false;
    const v = selectedValuesArray[0];
    return v !== undefined && v !== null && v !== '';
  }, [multiple, selectedValuesArray]);

  const openMenu = () => {
    if (disabled || readOnly) return;
    setIsOpen(true);
    setIsFocused(true);

    let indexToHighlight = 0;
    if (selectedValuesArray.length) {
      const first = selectedValuesArray[0] as T;
      indexToHighlight = Math.max(
        0,
        options.findIndex((o) => getKey(o.value) === getKey(first)),
      );
    }
    setHighlightedIndex(indexToHighlight);
  };

  const closeMenu = () => setIsOpen(false);

  // Outside click via pointerdown for better device coverage
  useEffect(() => {
    if (!isOpen) return;
    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (rootRef.current && !rootRef.current.contains(target)) closeMenu();
    };
    window.addEventListener('pointerdown', handlePointerDown);
    return () => window.removeEventListener('pointerdown', handlePointerDown);
  }, [isOpen]);

  // Auto focus
  useEffect(() => {
    if (autoFocus) {
      buttonRef.current?.focus();
    }
  }, [autoFocus]);

  // Compute menu width
  useLayoutEffect(() => {
    if (!isOpen) return;
    if (autoWidth) {
      window.requestAnimationFrame(() => setMenuStyle({ minWidth: 'auto', width: 'auto' }));
      return;
    }
    const width = buttonRef.current?.offsetWidth;
    if (width) window.requestAnimationFrame(() => setMenuStyle({ minWidth: width }));
  }, [isOpen, autoWidth]);

  const commitChange = (
    event: React.MouseEvent | React.KeyboardEvent | React.ChangeEvent,
    newValue: T | T[],
  ) => {
    if (!isControlled) setInternalValue(newValue);
    onChange?.(event, newValue);
  };

  const toggleValueInMultiple = (event: React.MouseEvent | React.KeyboardEvent, optionValue: T) => {
    const current = selectedValuesArray;
    const exists = selectedSet.has(getKey(optionValue));
    const next = exists
      ? current.filter(
          (v) => !selectedSet.has(getKey(optionValue)) || getKey(v) !== getKey(optionValue),
        )
      : [...current, optionValue];
    commitChange(event, next);
  };

  const selectSingleValue = (event: React.MouseEvent | React.KeyboardEvent, v: T) => {
    commitChange(event, v);
    closeMenu();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (disabled || readOnly) return;

    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      if (!isOpen) {
        openMenu();
        return;
      }
      setHighlightedIndex((idx) => {
        const last = options.length - 1;
        const next = event.key === 'ArrowDown' ? Math.min(last, idx + 1) : Math.max(0, idx - 1);
        return next;
      });
      return;
    }

    if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault();
      setHighlightedIndex(event.key === 'Home' ? 0 : Math.max(0, options.length - 1));
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (!isOpen) {
        openMenu();
        return;
      }
      const option = options[highlightedIndex];
      if (option && !option.disabled) {
        if (multiple) toggleValueInMultiple(event, option.value);
        else selectSingleValue(event, option.value);
      }
      return;
    }

    if (event.key === 'Escape') {
      if (isOpen) {
        event.preventDefault();
        closeMenu();
      }
    }
  };

  const hiddenInputValue = useMemo(() => {
    if (!name) return undefined;
    if (!hasValue) return '';
    if (multiple) return selectedValuesArray.map(getKey).join(',');
    return String(selectedValuesArray[0] as SelectValue);
  }, [name, hasValue, multiple, selectedValuesArray]);

  return {
    isOpen,
    isFocused,
    highlightedIndex,
    setHighlightedIndex,
    setIsFocused,
    openMenu,
    closeMenu,
    handleKeyDown,
    toggleValueInMultiple,
    selectSingleValue,
    selectedValuesArray,
    selectedSet,
    hasValue,
    menuStyle,
    rootRef,
    buttonRef,
    hiddenInputValue,
  };
}

export const utils = { toArray, getKey };
