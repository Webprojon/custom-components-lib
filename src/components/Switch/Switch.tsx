import React, { useRef, useState } from 'react';
import * as styles from './Switch.module.scss';
import type { SwitchProps } from './Switch.types';
import { defaultProps } from './Switch.types';

export const Switch: React.FC<SwitchProps> = ({
  id,
  name,
  value,
  checked,
  defaultChecked,
  onChange,
  disabled = defaultProps.disabled,
  size = defaultProps.size,
  color = defaultProps.color,
  label,
  labelPlacement = defaultProps.labelPlacement,
  className = '',
  'data-testid': dataTestId,
  inputRef,
  inputProps,
}) => {
  const isControlled = checked !== undefined;
  const [internalChecked, setInternalChecked] = useState<boolean>(!!defaultChecked);
  const [isFocusedVisible, setIsFocusedVisible] = useState<boolean>(false);
  const inputElementRef = useRef<HTMLInputElement | null>(null);

  const currentChecked = isControlled ? !!checked : internalChecked;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setInternalChecked(event.target.checked);
    }
    onChange?.(event, event.target.checked);
  };

  const containerClasses = [
    styles.container,
    labelPlacement === 'start' && styles.start,
    disabled && styles.disabled,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const trackClasses = [
    styles.track,
    size && styles[size],
    currentChecked && styles.checked,
    color === 'secondary'
      ? styles.colorSecondary
      : color === 'success'
        ? styles.colorSuccess
        : color === 'info'
          ? styles.colorInfo
          : color === 'warning'
            ? styles.colorWarning
            : color === 'error'
              ? styles.colorError
              : undefined,
    isFocusedVisible && styles.focusVisible,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <label className={containerClasses} data-testid={dataTestId}>
      <span className={styles.root} style={{ position: 'relative' }}>
        <input
          id={id}
          ref={(node) => {
            inputElementRef.current = node;
            inputRef?.(node as HTMLInputElement);
          }}
          className={styles.input}
          type="checkbox"
          role="switch"
          name={name}
          value={value}
          checked={isControlled ? checked : undefined}
          defaultChecked={isControlled ? undefined : internalChecked}
          onChange={handleChange}
          onFocus={(e) => {
            if (e.currentTarget.matches(':focus-visible')) setIsFocusedVisible(true);
          }}
          onBlur={() => setIsFocusedVisible(false)}
          disabled={disabled}
          aria-checked={currentChecked}
          {...inputProps}
        />
        <span className={`${trackClasses}`} aria-hidden="true">
          <span className={styles.thumb} />
        </span>
      </span>
      {label && (
        <span className={styles.label} onMouseDown={(e) => e.preventDefault()}>
          {label}
        </span>
      )}
    </label>
  );
};

export default Switch;
