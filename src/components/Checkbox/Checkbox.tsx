import React from 'react';
import { useId } from 'react';
import { CheckboxProps, defaultProps } from './Checkbox.types';
import * as styles from './Checkbox.module.scss';

export const Checkbox: React.FC<CheckboxProps> = ({
  id,
  name,
  value,
  checked,
  defaultChecked,
  onChange,
  disabled = defaultProps.disabled,
  required = defaultProps.required,
  indeterminate = defaultProps.indeterminate,
  label,
  labelPlacement = defaultProps.labelPlacement,
  color = defaultProps.color,
  size = defaultProps.size,
  className = '',
  'data-testid': dataTestId,
  inputRef,
  inputProps,
}) => {
  const autoId = useId();
  const fieldId = id ?? `cb-${autoId}`;
  const isControlled = checked !== undefined;
  const [internalChecked, setInternalChecked] = React.useState<boolean>(!!defaultChecked);
  const inputElementRef = React.useRef<HTMLInputElement | null>(null);
  const boxRef = React.useRef<HTMLSpanElement | null>(null);

  React.useEffect(() => {
    const el = inputElementRef.current;
    if (el) {
      el.indeterminate = !!indeterminate && !(isControlled ? checked : internalChecked);
    }
  }, [indeterminate, checked, internalChecked, isControlled]);

  const currentChecked = isControlled ? !!checked : internalChecked;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setInternalChecked(event.target.checked);
    }
    onChange?.(event, event.target.checked);
  };
  const colorClassName =
    color === 'secondary'
      ? styles.colorSecondary
      : color === 'success'
        ? styles.colorSuccess
        : color === 'error'
          ? styles.colorError
          : color === 'info'
            ? styles.colorInfo
            : color === 'warning'
              ? styles.colorWarning
              : undefined;

  const labelClasses = [
    styles.label,
    size === 'small' && styles.smallLabel,
    size === 'large' && styles.largeLabel,
  ]
    .filter(Boolean)
    .join(' ');

  const boxClasses = [
    styles.box,
    size === 'small' && styles.small,
    size === 'large' && styles.large,
    currentChecked && styles.checked,
    colorClassName,
  ]
    .filter(Boolean)
    .join(' ');

  const containerClasses = [
    styles.container,
    labelPlacement === 'start' && styles.start,
    disabled && styles.disabled,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const rootClasses = [
    styles.root,
    size === 'small' && styles.small,
    size === 'large' && styles.large,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <label className={containerClasses} data-testid={dataTestId}>
      <span className={rootClasses}>
        <span className={styles.hoverHalo} aria-hidden="true" />
        <input
          id={fieldId}
          ref={(node) => {
            inputElementRef.current = node;
            inputRef?.(node as HTMLInputElement);
          }}
          className={styles.input}
          type="checkbox"
          name={name}
          value={value}
          checked={isControlled ? checked : undefined}
          defaultChecked={isControlled ? undefined : internalChecked}
          onChange={handleChange}
          disabled={disabled}
          required={required}
          aria-checked={indeterminate ? 'mixed' : currentChecked}
          {...inputProps}
        />

        <span
          ref={boxRef}
          className={boxClasses}
          aria-hidden="true"
          style={{ position: 'relative', overflow: 'hidden', zIndex: 1 }}
        >
          {indeterminate && !currentChecked ? (
            <span className={styles.indeterminateMark} />
          ) : (
            <svg className={styles.checkmark} viewBox="0 0 24 24">
              <path fill="currentColor" d="M9 16.2l-3.5-3.5-1.4 1.4L9 19 20.3 7.7l-1.4-1.4z" />
            </svg>
          )}
        </span>
      </span>
      {label && (
        <span
          className={labelClasses}
          onMouseDown={(e) => e.preventDefault()}
          onClick={(e) => e.preventDefault()}
        >
          {label}
        </span>
      )}
    </label>
  );
};

export default Checkbox;
