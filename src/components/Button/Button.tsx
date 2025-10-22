import React from 'react';
import { ButtonProps, defaultProps } from './Button.types';
import * as styles from './Button.module.scss';

export const Button: React.FC<ButtonProps> = ({
  children,
  disabled = defaultProps.disabled,
  onClick,
  type = defaultProps.type,
  variant = defaultProps.variant,
  size = defaultProps.size,
  color = defaultProps.color,
  startIcon,
  endIcon,
  loading = defaultProps.loading,
  loadingPosition = defaultProps.loadingPosition,
  fullWidth = defaultProps.fullWidth,
  'aria-label': ariaLabel,
  className = '',
  'data-testid': dataTestId,
  id,
  name,
  value,
  form,
  autoFocus = defaultProps.autoFocus,
  tabIndex,
}) => {
  const [ripples, setRipples] = React.useState<
    Array<{ id: number; x: number; y: number; size: number }>
  >([]);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const nextRippleId = React.useRef<number>(0);

  const getButtonClasses = (): string => {
    const classes = [
      styles.button,
      variant && styles[variant],
      size && styles[size],
      color && styles[color],
      disabled && styles.disabled,
      loading && styles.loading,
      fullWidth && styles.fullWidth,
      className,
    ];

    return classes.filter(Boolean).join(' ');
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    if (disabled || loading) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    onClick?.(event);
  };

  const addRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
    const element = buttonRef.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    const id = nextRippleId.current++;
    setRipples((current) => [...current, { id, x, y, size }]);

    // Cleanup ripple after animation
    window.setTimeout(() => {
      setRipples((current) => current.filter((r) => r.id !== id));
    }, 1200);
  };

  const renderLoadingSpinner = (): React.ReactNode => (
    <span className={styles.spinner} aria-hidden="true">
      <svg className={styles.spinnerSvg} viewBox="0 0 24 24">
        <circle
          className={styles.spinnerCircle}
          cx="12"
          cy="12"
          r="10"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="31.416"
          strokeDashoffset="31.416"
        />
      </svg>
    </span>
  );

  const renderContent = (): React.ReactNode => {
    const showStartLoading = loading && loadingPosition === 'start';
    const showEndLoading = loading && loadingPosition === 'end';
    const showStartIcon = !showStartLoading && startIcon;
    const showEndIcon = !showEndLoading && endIcon;

    return (
      <>
        {showStartLoading && renderLoadingSpinner()}
        {showStartIcon && (
          <span className={styles.startIcon} aria-hidden="true">
            {startIcon}
          </span>
        )}
        <span className={styles.content}>{children}</span>
        {showEndIcon && (
          <span className={styles.endIcon} aria-hidden="true">
            {endIcon}
          </span>
        )}
        {showEndLoading && renderLoadingSpinner()}

        <span className={styles.rippleContainer} aria-hidden="true">
          {ripples.map((r) => (
            <span
              key={r.id}
              className={styles.ripple}
              style={{ left: r.x, top: r.y, width: r.size, height: r.size }}
            />
          ))}
        </span>
      </>
    );
  };

  const getAccessibilityProps = () => ({
    'aria-disabled': disabled,
    'aria-label': ariaLabel,
    'aria-busy': loading,
    'data-testid': dataTestId,
    tabIndex: disabled ? -1 : tabIndex,
  });

  const getHtmlAttributes = () => ({
    id,
    name,
    value,
    form,
    autoFocus,
    type,
  });

  return (
    <button
      ref={buttonRef}
      className={getButtonClasses()}
      onClick={handleClick}
      onMouseDown={addRipple}
      disabled={disabled || loading}
      {...getAccessibilityProps()}
      {...getHtmlAttributes()}
    >
      {renderContent()}
    </button>
  );
};

export default Button;
