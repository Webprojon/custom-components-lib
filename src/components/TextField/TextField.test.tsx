import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { describe, it, expect, jest } from '@jest/globals';
import { TextField } from './TextField';

describe('TextField', () => {
  const setup = (ui: React.ReactElement) => {
    const user = userEvent.setup();
    const result = render(ui);
    return { user, ...result };
  };

  it('renders input with label and placeholder', () => {
    render(<TextField id="name" label="Name" placeholder="Enter" />);
    const input = screen.getByLabelText('Name');
    expect(input.getAttribute('id')).toBe('name');
    expect((input as HTMLInputElement).placeholder).toBe('Enter');
  });

  it('uncontrolled: defaultValue initializes and updates on change', async () => {
    const { user } = setup(<TextField defaultValue="A" />);
    const inputEl = screen.getByRole('textbox');
    expect((inputEl as HTMLInputElement).value).toBe('A');
    await user.type(inputEl, 'B');
    expect((inputEl as HTMLInputElement).value.endsWith('B')).toBe(true);
  });

  it('controlled: value reflects prop and calls onChange', async () => {
    const handleChange = jest.fn();
    const { user, rerender } = setup(<TextField value="a" onChange={handleChange} />);
    const inputEl = screen.getByRole('textbox');
    expect((inputEl as HTMLInputElement).value).toBe('a');
    await user.type(inputEl, 'b');
    expect(handleChange).toHaveBeenCalled();
    rerender(<TextField value="ab" onChange={handleChange} />);
    const inputEl2 = screen.getByRole('textbox');
    expect((inputEl2 as HTMLInputElement).value).toBe('ab');
  });

  it('supports multiline textarea with rows', () => {
    render(<TextField multiline rows={5} />);
    const textarea = screen.getByRole('textbox');
    expect(textarea.tagName.toLowerCase()).toBe('textarea');
    expect(textarea.getAttribute('rows')).toBe('5');
  });

  it('renders for variant, size, color, error and fullWidth combinations', () => {
    const { rerender } = render(<TextField variant="outlined" size="small" color="secondary" />);
    expect(screen.getByRole('textbox')).toBeTruthy();

    rerender(<TextField variant="filled" size="large" color="success" error fullWidth />);
    expect(screen.getByRole('textbox')).toBeTruthy();
  });

  it('shows helper text and error state', () => {
    render(<TextField id="e" helperText="Help" error />);
    expect(screen.getByText('Help')).toBeTruthy();
    const input = screen.getByRole('textbox');
    expect(input.getAttribute('aria-invalid')).toBe('true');
  });

  it('forwards start and end adornments', () => {
    render(
      <TextField
        startAdornment={<span data-testid="s">S</span>}
        endAdornment={<span data-testid="e">E</span>}
      />,
    );
    expect(screen.getByTestId('s')).toBeTruthy();
    expect(screen.getByTestId('e')).toBeTruthy();
  });
});
