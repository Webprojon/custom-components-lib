import React from 'react';
import * as styles from './Select.module.scss';
import type { SelectProps, SelectValue } from './Select.types';
import { defaultProps } from './Select.types';
import { useSelect, utils } from './useSelect';

export function Select<T extends SelectValue = SelectValue>(props: SelectProps<T>) {
  const {
    id,
    name,
    label,
    helperText,
    placeholder,
    disabled = defaultProps.disabled,
    required = defaultProps.required,
    readOnly = defaultProps.readOnly,
    autoFocus = defaultProps.autoFocus,
    fullWidth = defaultProps.fullWidth,
    width,
    size = defaultProps.size,
    color = defaultProps.color,
    variant = defaultProps.variant,
    error = defaultProps.error,
    className = '',
    'data-testid': dataTestId,
    options = [],
    autoWidth = defaultProps.autoWidth,
    multiple = defaultProps.multiple,
    chipDisplay = defaultProps.chipDisplay,
    withCheckmarks = defaultProps.withCheckmarks,
    renderValue,
    value: controlledValueProp,
    defaultValue: defaultValueProp,
    onChange,
  } = props as SelectProps<T> & { value?: T | T[]; defaultValue?: T | T[] };

  const {
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
  } = useSelect<T>({
    name: name ?? '',
    options,
    multiple,
    autoWidth,
    autoFocus,
    readOnly,
    disabled,
    value: controlledValueProp,
    defaultValue: defaultValueProp,
    onChange: onChange as (
      event: React.MouseEvent | React.KeyboardEvent | React.ChangeEvent,
      value: T | T[],
    ) => void,
  });

  const colorClassName =
    color === 'primary'
      ? styles.colorPrimary
      : color === 'secondary'
        ? styles.colorSecondary
        : color === 'success'
          ? styles.colorSuccess
          : color === 'info'
            ? styles.colorInfo
            : color === 'warning'
              ? styles.colorWarning
              : color === 'error'
                ? styles.colorError
                : undefined;

  const variantClassName =
    variant === 'outlined'
      ? styles.outlined
      : variant === 'filled'
        ? styles.filled
        : styles.standard;

  const cx = (...xs: Array<string | false | undefined>) => xs.filter(Boolean).join(' ');
  const containerClasses = cx(
    styles.container,
    variantClassName,
    size && styles[size],
    colorClassName,
    error && styles.error,
    disabled && styles.disabled,
    label ? styles.withLabel : undefined,
    (isFocused || hasValue) && styles.shrink,
    isFocused && styles.focused,
  );

  const rootClasses = cx(styles.selectRoot, fullWidth && styles.fullWidth, className);

  const helperTextId = id ? `${id}-helper-text` : undefined;
  const listboxId = id ? `${id}-listbox` : undefined;

  const getDisplayContent = (): React.ReactNode => {
    if (renderValue && hasValue) {
      const selectedForRender = multiple ? selectedValuesArray : selectedValuesArray[0];
      return renderValue(selectedForRender as T | T[], options);
    }

    if (!hasValue) {
      return <span className={styles.placeholder}>{placeholder}</span>;
    }

    if (multiple) {
      if (chipDisplay) {
        const chips = options.filter((o) => selectedSet.has(utils.getKey(o.value)));
        return (
          <span className={styles.chips}>
            {chips.map((o) => (
              <span
                key={String(o.value)}
                className={styles.chip}
                onMouseDown={(e) => e.preventDefault()}
              >
                <span>{o.label}</span>
                <button
                  type="button"
                  className={styles.chipRemove}
                  aria-label="Remove"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleValueInMultiple(e, o.value);
                  }}
                >
                  ×
                </button>
              </span>
            ))}
          </span>
        );
      }
      // default multiple display
      const selectedOptions = options.filter((o) => selectedSet.has(utils.getKey(o.value)));
      return (
        <span>
          {selectedOptions.map((o, i) => (
            <span key={String(o.value)}>
              {o.label}
              {i < selectedOptions.length - 1 ? ', ' : ''}
            </span>
          ))}
        </span>
      );
    }

    const singleSelected: T | undefined = !multiple
      ? (selectedValuesArray[0] as unknown as T | undefined)
      : undefined;
    const selectedOption = options.find((o) =>
      singleSelected !== undefined ? utils.getKey(o.value) === utils.getKey(singleSelected) : false,
    );
    return <span>{selectedOption ? selectedOption.label : ''}</span>;
  };

  return (
    <div
      ref={rootRef}
      className={rootClasses}
      style={
        width
          ? ({
              ['--select-width']: typeof width === 'number' ? `${width}px` : width,
            } as React.CSSProperties)
          : undefined
      }
      data-testid={dataTestId}
    >
      <div
        ref={buttonRef}
        id={id}
        className={`${containerClasses} ${size ? styles[size] : ''}`}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-invalid={!!error}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        onClick={() => (isOpen ? closeMenu() : openMenu())}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => !isOpen && setIsFocused(false)}
      >
        {label && (
          <label
            className={styles.floatingLabel}
            htmlFor={id}
            onMouseDown={(e) => e.preventDefault()}
          >
            {label}
          </label>
        )}
        <div className={styles.display}>{getDisplayContent()}</div>
        <span className={styles.arrow} aria-hidden="true">
          ▾
        </span>
      </div>

      {helperText && (
        <p id={helperTextId} className={`${styles.helperText} ${error ? styles.errorText : ''}`}>
          {helperText}
        </p>
      )}

      {isOpen && (
        <div
          className={styles.menu}
          id={listboxId}
          role="listbox"
          aria-multiselectable={multiple}
          style={menuStyle}
        >
          {options.length === 0 ? (
            <div className={styles.menuItem} aria-disabled="true">
              No options available
            </div>
          ) : (
            options.map((option, index) => {
              const isSelected = selectedSet.has(utils.getKey(option.value));
              const isHighlighted = index === highlightedIndex;
              const itemClasses = cx(
                styles.menuItem,
                option.disabled && 'disabled',
                isHighlighted && 'highlighted',
              );
              return (
                <div
                  key={String(option.value)}
                  role="option"
                  aria-selected={isSelected}
                  className={itemClasses}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  onClick={(e) => {
                    if (option.disabled) return;
                    if (multiple) toggleValueInMultiple(e, option.value);
                    else selectSingleValue(e, option.value);
                  }}
                >
                  {multiple && withCheckmarks && (
                    <span
                      className={`${styles.menuCheck} ${isSelected ? 'checked' : ''}`}
                      aria-hidden="true"
                    >
                      {isSelected ? '✓' : ''}
                    </span>
                  )}
                  <span>{option.label}</span>
                </div>
              );
            })
          )}
        </div>
      )}

      {name && (
        <input type="hidden" name={name} required={required} value={hiddenInputValue} readOnly />
      )}
    </div>
  );
}

export default Select;
