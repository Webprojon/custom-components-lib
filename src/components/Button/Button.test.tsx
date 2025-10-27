import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, jest } from '@jest/globals';
import { Button } from './Button';

describe('Button', () => {
  const setup = (ui: React.ReactElement) => {
    const user = userEvent.setup();
    return { user, ...render(ui) };
  };

  it('renders children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeTruthy();
  });

  it('calls onClick when not disabled or loading', async () => {
    const handleClick = jest.fn();
    const { user } = setup(<Button onClick={handleClick}>Action</Button>);
    await user.click(screen.getByRole('button', { name: 'Action' }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('prevents click when disabled', async () => {
    const handleClick = jest.fn();
    const { user } = setup(
      <Button disabled onClick={handleClick}>
        Disabled
      </Button>,
    );
    const btn = screen.getByRole('button', { name: 'Disabled' });
    expect((btn as HTMLButtonElement).disabled).toBe(true);
    await user.click(btn);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('prevents click when loading', async () => {
    const handleClick = jest.fn();
    const { user } = setup(
      <Button loading onClick={handleClick}>
        Loading
      </Button>,
    );
    const btn = screen.getByRole('button', { name: 'Loading' });
    expect((btn as HTMLButtonElement).disabled).toBe(true);
    await user.click(btn);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('renders for variant values', () => {
    const { rerender } = render(<Button variant="text">Text</Button>);
    expect(screen.getByRole('button', { name: 'Text' })).toBeTruthy();

    rerender(<Button variant="outlined">Outlined</Button>);
    expect(screen.getByRole('button', { name: 'Outlined' })).toBeTruthy();

    rerender(<Button variant="contained">Contained</Button>);
    expect(screen.getByRole('button', { name: 'Contained' })).toBeTruthy();
  });

  it('renders for size values', () => {
    const { rerender } = render(<Button size="small">S</Button>);
    expect(screen.getByRole('button', { name: 'S' })).toBeTruthy();

    rerender(<Button size="medium">M</Button>);
    expect(screen.getByRole('button', { name: 'M' })).toBeTruthy();

    rerender(<Button size="large">L</Button>);
    expect(screen.getByRole('button', { name: 'L' })).toBeTruthy();
  });

  it('renders for color values', () => {
    const { rerender } = render(<Button color="primary">P</Button>);
    expect(screen.getByRole('button', { name: 'P' })).toBeTruthy();

    rerender(<Button color="secondary">S</Button>);
    expect(screen.getByRole('button', { name: 'S' })).toBeTruthy();

    rerender(<Button color="success">Suc</Button>);
    expect(screen.getByRole('button', { name: 'Suc' })).toBeTruthy();

    rerender(<Button color="info">I</Button>);
    expect(screen.getByRole('button', { name: 'I' })).toBeTruthy();

    rerender(<Button color="warning">W</Button>);
    expect(screen.getByRole('button', { name: 'W' })).toBeTruthy();

    rerender(<Button color="error">E</Button>);
    expect(screen.getByRole('button', { name: 'E' })).toBeTruthy();
  });

  it('renders start and end icons', () => {
    render(
      <Button
        startIcon={<span data-testid="start">S</span>}
        endIcon={<span data-testid="end">E</span>}
      >
        Label
      </Button>,
    );
    expect(screen.getByTestId('start')).toBeTruthy();
    expect(screen.getByTestId('end')).toBeTruthy();
  });

  it('shows loading spinner when loading at start and end', () => {
    const { rerender } = render(
      <Button loading loadingPosition="start">
        Start
      </Button>,
    );
    let btn = screen.getByRole('button', { name: 'Start' });
    expect(btn.querySelector('svg')).not.toBeNull();

    rerender(
      <Button loading loadingPosition="end">
        End
      </Button>,
    );
    btn = screen.getByRole('button', { name: 'End' });
    expect(btn.querySelector('svg')).not.toBeNull();
  });

  it('renders when fullWidth is true', () => {
    render(<Button fullWidth>Wide</Button>);
    const btn = screen.getByRole('button', { name: 'Wide' });
    expect(btn).toBeTruthy();
  });

  it('supports aria-label and data-testid', () => {
    render(
      <Button aria-label="custom" data-testid="btn">
        A
      </Button>,
    );
    const btn = screen.getByTestId('btn');
    expect(btn.getAttribute('aria-label')).toBe('custom');
    expect(btn.getAttribute('aria-busy')).toBe('false');
  });

  it('forwards other native props and style', () => {
    render(
      <Button title="tooltip" style={{ marginTop: 4 }}>
        Native
      </Button>,
    );
    const btn = screen.getByRole('button', { name: 'Native' });
    expect(btn.getAttribute('title')).toBe('tooltip');
    expect((btn as HTMLButtonElement).style.marginTop).toBe('4px');
  });
});
