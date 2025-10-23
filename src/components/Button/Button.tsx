import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { ButtonProps, defaultProps } from './Button.types';
import clsx from 'clsx';
import styles from './Button.module.scss';

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
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
      tabIndex,
      style,
      ...rest
    },
    ref,
  ) => {
    const [ripples, setRipples] = useState<
      Array<{ id: number; x: number; y: number; size: number }>
    >([]);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const nextRippleId = useRef<number>(0);

    useImperativeHandle(ref, () => buttonRef.current as HTMLButtonElement);

    const getButtonClasses = (): string =>
      clsx(
        styles.button,
        variant && styles[variant],
        size && styles[size],
        color && styles[color],
        disabled && styles.disabled,
        loading && styles.loading,
        fullWidth && styles.fullWidth,
        className,
      );

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
      if (disabled || loading) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      onClick?.(event);
    };

    const addRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled || loading) return;
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

    return (
      <button
        ref={buttonRef}
        className={getButtonClasses()}
        onClick={handleClick}
        onMouseDown={addRipple}
        disabled={disabled || loading}
        style={style}
        type={type}
        {...getAccessibilityProps()}
        {...rest}
      >
        {renderContent()}
      </button>
    );
  },
);

Button.displayName = 'Button';

export default Button;
