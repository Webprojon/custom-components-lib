import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { describe, it, expect, jest } from '@jest/globals';
import { Checkbox } from './Checkbox';

// Note: We use standard Jest assertions and DOM attribute checks to avoid jest-dom type issues

describe('Checkbox', () => {
  const setup = (ui: React.ReactElement) => {
    const user = userEvent.setup();
    const result = render(ui);
    return { user, ...result };
  };

  it('renders with label and associates input via id', () => {
    render(<Checkbox id="agree" label="Agree" />);
    const input = screen.getByRole('checkbox');
    expect(input.getAttribute('id')).toBe('agree');
    expect(screen.getByText('Agree')).toBeTruthy();
  });

  it('supports data-testid', () => {
    render(<Checkbox data-testid="cb" />);
    expect(screen.getByTestId('cb')).toBeTruthy();
  });

  it('uncontrolled: toggles when clicked', async () => {
    const { user } = setup(<Checkbox defaultChecked={false} />);
    const input = screen.getByRole('checkbox');
    expect(input.getAttribute('aria-checked')).toBe('false');
    await user.click(input);
    expect(input.getAttribute('aria-checked')).toBe('true');
    await user.click(input);
    expect(input.getAttribute('aria-checked')).toBe('false');
  });

  it('controlled: calls onChange and reflects checked prop only', async () => {
    const handleChange = jest.fn();
    const { user, rerender } = setup(
      <Checkbox checked={false} onChange={handleChange} label="C" />,
    );
    const input = screen.getByRole('checkbox');
    expect(input.getAttribute('aria-checked')).toBe('false');
    await user.click(input);
    expect(handleChange).toHaveBeenCalledTimes(1);
    // stays false until rerendered with true
    expect(input.getAttribute('aria-checked')).toBe('false');
    rerender(<Checkbox checked={true} onChange={handleChange} label="C" />);
    expect(screen.getByRole('checkbox').getAttribute('aria-checked')).toBe('true');
  });

  it('indeterminate: sets aria-checked="mixed" when not checked', () => {
    render(<Checkbox indeterminate defaultChecked={false} />);
    const input = screen.getByRole('checkbox');
    expect(input.getAttribute('aria-checked')).toBe('mixed');
  });

  it('disabled and required propagate to input', () => {
    render(<Checkbox disabled required />);
    const input = screen.getByRole('checkbox');
    expect((input as HTMLInputElement).disabled).toBe(true);
    expect((input as HTMLInputElement).required).toBe(true);
  });

  it('renders for each size value', () => {
    const { rerender } = render(<Checkbox size="small" />);
    expect(screen.getByRole('checkbox')).toBeTruthy();
    rerender(<Checkbox size="medium" />);
    expect(screen.getByRole('checkbox')).toBeTruthy();
    rerender(<Checkbox size="large" />);
    expect(screen.getByRole('checkbox')).toBeTruthy();
  });

  it('renders for each color value', () => {
    const { rerender } = render(<Checkbox color="primary" />);
    expect(screen.getByRole('checkbox')).toBeTruthy();
    rerender(<Checkbox color="secondary" />);
    expect(screen.getByRole('checkbox')).toBeTruthy();
    rerender(<Checkbox color="success" />);
    expect(screen.getByRole('checkbox')).toBeTruthy();
    rerender(<Checkbox color="info" />);
    expect(screen.getByRole('checkbox')).toBeTruthy();
    rerender(<Checkbox color="warning" />);
    expect(screen.getByRole('checkbox')).toBeTruthy();
    rerender(<Checkbox color="error" />);
    expect(screen.getByRole('checkbox')).toBeTruthy();
  });

  it('renders with labelPlacement start', () => {
    render(<Checkbox label="Text" labelPlacement="start" />);
    expect(screen.getByText('Text')).toBeTruthy();
  });

  it('fires onChange with next checked value', async () => {
    const handleChange = jest.fn();
    const { user } = setup(<Checkbox defaultChecked={false} onChange={handleChange} />);
    const input = screen.getByRole('checkbox');
    await user.click(input);
    expect(handleChange).toHaveBeenCalledTimes(1);
    const [, nextChecked] = handleChange.mock.calls[0];
    expect(nextChecked).toBe(true);
  });
});
