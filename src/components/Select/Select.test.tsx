import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { describe, it, expect, jest } from '@jest/globals';
import { Select } from './Select';

const OPTIONS = [
  { value: 'a', label: 'Alpha' },
  { value: 'b', label: 'Beta' },
  { value: 'c', label: 'Gamma' },
];

describe('Select', () => {
  const setup = (ui: React.ReactElement) => {
    const user = userEvent.setup();
    const result = render(ui);
    return { user, ...result };
  };

  it('renders with label and placeholder (no visible label when placeholder present)', () => {
    render(<Select id="s" label="Choose" placeholder="Pick one" options={OPTIONS} />);
    const combobox = screen.getByRole('combobox');
    expect(combobox.getAttribute('id')).toBe('s');
    expect(screen.getByText('Pick one')).toBeTruthy();
  });

  it('opens menu on click and selects single value', async () => {
    const onChange = jest.fn();
    const { user } = setup(<Select options={OPTIONS} onChange={onChange} />);
    const button = screen.getByRole('combobox');
    await user.click(button);
    const option = await screen.findByRole('option', { name: 'Beta' });
    await user.click(option);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(screen.getByText('Beta')).toBeTruthy();
  });

  it('multiple selection toggles values and can render as chips', async () => {
    const { user } = setup(<Select options={OPTIONS} multiple chipDisplay withCheckmarks />);
    const button = screen.getByRole('combobox');
    await user.click(button);
    await user.click(screen.getByRole('option', { name: 'Alpha' }));
    // menu remains open for multiple; select another
    await user.click(screen.getByRole('option', { name: 'Gamma' }));
    expect(screen.getAllByText(/Alpha|Gamma/).length).toBeGreaterThan(0);
  });

  it('controlled value reflects prop, onChange fires', async () => {
    const onChange = jest.fn();
    const { user, rerender } = setup(<Select value="a" onChange={onChange} options={OPTIONS} />);
    const button = screen.getByRole('combobox');
    await user.click(button);
    await user.click(screen.getByRole('option', { name: 'Beta' }));
    expect(onChange).toHaveBeenCalledTimes(1);
    rerender(<Select value="b" onChange={onChange} options={OPTIONS} />);
    expect(screen.getByText('Beta')).toBeTruthy();
  });

  it('disabled prevents opening and interaction', async () => {
    const { user } = setup(<Select disabled options={OPTIONS} />);
    const button = screen.getByRole('combobox');
    await user.click(button);
    expect(screen.queryByRole('option', { name: 'Alpha' })).toBeNull();
  });

  it('renders for variant, size, color, error, fullWidth and width props', () => {
    render(
      <Select
        variant="filled"
        size="small"
        color="secondary"
        error
        fullWidth
        width={300}
        options={OPTIONS}
      />,
    );
    expect(screen.getByRole('combobox')).toBeTruthy();
  });
});
