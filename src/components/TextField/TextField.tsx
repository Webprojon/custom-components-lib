import React from 'react';
import { TextFieldProps, defaultProps } from './TextField.types';
import * as styles from './TextField.module.scss';

export const TextField: React.FC<TextFieldProps> = ({
  id,
  name,
  label,
  placeholder,
  value,
  defaultValue,
  onChange,
  onBlur,
  onFocus,
  type = 'text',
  disabled = defaultProps.disabled,
  required = defaultProps.required,
  readOnly = defaultProps.readOnly,
  autoFocus = defaultProps.autoFocus,
  autoComplete,
  fullWidth = defaultProps.fullWidth,
  size = defaultProps.size,
  color = defaultProps.color,
  variant = defaultProps.variant,
  error = defaultProps.error,
  helperText,
  startAdornment,
  endAdornment,
  inputProps,
  inputRef,
  className = '',
  'data-testid': dataTestId,
  multiline = defaultProps.multiline,
  rows,
}) => {
  const isControlled = value !== undefined;
  const normalizeValue = (val: string | number | undefined | null): string =>
    val === undefined || val === null ? '' : String(val);

  const [isFocused, setIsFocused] = React.useState<boolean>(false);
  const [internalValue, setInternalValue] = React.useState<string>(normalizeValue(defaultValue));

  React.useEffect(() => {
    if (!isControlled) {
      setInternalValue(normalizeValue(defaultValue));
    }
  }, [defaultValue, isControlled]);

  const currentValue = isControlled
    ? normalizeValue(value as string | number | undefined | null)
    : internalValue;
  const hasValue = currentValue.length > 0;
  const shouldShrink = Boolean(label) && (isFocused || hasValue);

  const handleFocus = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setIsFocused(true);
    onFocus?.(event);
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setIsFocused(false);
    onBlur?.(event);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!isControlled) {
      setInternalValue(event.target.value);
    }
    onChange?.(event);
  };

  const helperTextId = id ? `${id}-helper-text` : undefined;

  const rootClasses = [styles.textField, fullWidth && styles.fullWidth, className]
    .filter(Boolean)
    .join(' ');

  const variantRootClass =
    variant === 'outlined'
      ? styles.outlinedRoot
      : variant === 'filled'
        ? styles.filledRoot
        : styles.standardRoot;

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

  const containerClasses = [
    variantRootClass,
    size && styles[size],
    colorClassName,
    error && styles.error,
    disabled && styles.disabled,
    label ? styles.withLabel : styles.noLabel,
    shouldShrink && styles.shrink,
    isFocused && styles.focused,
  ]
    .filter(Boolean)
    .join(' ');

  const inputCommonProps = {
    id,
    name,
    placeholder,
    disabled,
    required,
    readOnly,
    autoFocus,
    autoComplete,
    onFocus: handleFocus,
    onBlur: handleBlur,
    onChange: handleChange,
    'aria-invalid': !!error,
    'aria-describedby': helperText ? helperTextId : undefined,
    ...inputProps,
  } as const;

  const renderInput = () => {
    if (multiline) {
      return (
        <textarea
          className={styles.input}
          rows={rows}
          defaultValue={isControlled ? undefined : currentValue}
          value={isControlled ? currentValue : undefined}
          ref={inputRef as React.Ref<HTMLTextAreaElement>}
          {...(inputCommonProps as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      );
    }

    return (
      <input
        className={styles.input}
        type={type}
        defaultValue={isControlled ? undefined : currentValue}
        value={isControlled ? currentValue : undefined}
        ref={inputRef as React.Ref<HTMLInputElement>}
        {...(inputCommonProps as React.InputHTMLAttributes<HTMLInputElement>)}
      />
    );
  };

  return (
    <div className={rootClasses} data-testid={dataTestId}>
      <div className={containerClasses}>
        {startAdornment && (
          <span className={`${styles.adornment} ${styles.start}`}>{startAdornment}</span>
        )}

        {label && (
          <label className={styles.floatingLabel} htmlFor={id}>
            {label}
          </label>
        )}

        {renderInput()}

        {endAdornment && (
          <span className={`${styles.adornment} ${styles.end}`}>{endAdornment}</span>
        )}
      </div>

      {helperText && (
        <p id={helperTextId} className={`${styles.helperText} ${error ? styles.errorText : ''}`}>
          {helperText}
        </p>
      )}
    </div>
  );
};

export default TextField;
