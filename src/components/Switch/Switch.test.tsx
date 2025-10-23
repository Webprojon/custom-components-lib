import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { describe, it, expect, jest } from '@jest/globals';
import { Switch } from './Switch';

describe('Switch', () => {
  const setup = (ui: React.ReactElement) => {
    const user = userEvent.setup();
    const result = render(ui);
    return { user, ...result };
  };

  it('renders with optional label', () => {
    render(<Switch label="Airplane mode" />);
    expect(screen.getByText('Airplane mode')).toBeTruthy();
  });

  it('uncontrolled: toggles when clicked', async () => {
    const { user } = setup(<Switch defaultChecked={false} />);
    const input = screen.getByRole('switch');
    expect(input.getAttribute('aria-checked')).toBe('false');
    await user.click(input);
    expect(input.getAttribute('aria-checked')).toBe('true');
  });

  it('controlled: calls onChange and reflects checked only via props', async () => {
    const handleChange = jest.fn();
    const { user, rerender } = setup(
      <Switch checked={false} onChange={handleChange} label="Wifi" />,
    );
    const input = screen.getByRole('switch');
    await user.click(input);
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(input.getAttribute('aria-checked')).toBe('false');
    rerender(<Switch checked={true} onChange={handleChange} label="Wifi" />);
    expect(screen.getByRole('switch').getAttribute('aria-checked')).toBe('true');
  });

  it('respects disabled and exposes aria-checked', async () => {
    const { user } = setup(<Switch disabled />);
    const input = screen.getByRole('switch');
    expect((input as HTMLInputElement).disabled).toBe(true);
    await user.click(input);
    expect(input.getAttribute('aria-checked')).toBe('false');
  });

  it('renders with labelPlacement start', () => {
    render(<Switch label="Start" labelPlacement="start" />);
    expect(screen.getByText('Start')).toBeTruthy();
  });

  it('renders for size and color variants', () => {
    const { rerender } = render(<Switch size="small" color="secondary" />);
    expect(screen.getByRole('switch')).toBeTruthy();
    rerender(<Switch size="large" color="success" />);
    expect(screen.getByRole('switch')).toBeTruthy();
  });

  it('fires onChange with next checked value', async () => {
    const handleChange = jest.fn();
    const { user } = setup(<Switch defaultChecked={false} onChange={handleChange} />);
    const input = screen.getByRole('switch');
    await user.click(input);
    expect(handleChange).toHaveBeenCalledTimes(1);
    const [, nextChecked] = handleChange.mock.calls[0];
    expect(nextChecked).toBe(true);
  });
});
