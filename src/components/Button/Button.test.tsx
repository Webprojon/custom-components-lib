import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { describe, it, expect, jest } from '@jest/globals';
import { Button } from './Button';

describe('Button', () => {
  const setup = (ui: React.ReactElement) => {
    const user = userEvent.setup();
    const result = render(ui);
    return { user, ...result };
  };

  it('renders children', () => {
    render(<Button>Click me</Button>);
    expect(screen.queryByText('Click me')).not.toBeNull();
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

  it('applies variant classes', () => {
    const { rerender } = render(<Button variant="text">Text</Button>);
    let btn = screen.getByRole('button', { name: 'Text' });
    expect(btn.className).toMatch(/text/);

    rerender(<Button variant="outlined">Outlined</Button>);
    btn = screen.getByRole('button', { name: 'Outlined' });
    expect(btn.className).toMatch(/outlined/);

    rerender(<Button variant="contained">Contained</Button>);
    btn = screen.getByRole('button', { name: 'Contained' });
    expect(btn.className).toMatch(/contained/);
  });

  it('applies size classes', () => {
    const { rerender } = render(<Button size="small">S</Button>);
    let btn = screen.getByRole('button', { name: 'S' });
    expect(btn.className).toMatch(/small/);

    rerender(<Button size="medium">M</Button>);
    btn = screen.getByRole('button', { name: 'M' });
    expect(btn.className).toMatch(/medium/);

    rerender(<Button size="large">L</Button>);
    btn = screen.getByRole('button', { name: 'L' });
    expect(btn.className).toMatch(/large/);
  });

  it('applies color classes', () => {
    const { rerender } = render(<Button color="primary">P</Button>);
    let btn = screen.getByRole('button', { name: 'P' });
    expect(btn.className).toMatch(/primary/);

    rerender(<Button color="secondary">S</Button>);
    btn = screen.getByRole('button', { name: 'S' });
    expect(btn.className).toMatch(/secondary/);

    rerender(<Button color="success">Suc</Button>);
    btn = screen.getByRole('button', { name: 'Suc' });
    expect(btn.className).toMatch(/success/);

    rerender(<Button color="info">I</Button>);
    btn = screen.getByRole('button', { name: 'I' });
    expect(btn.className).toMatch(/info/);

    rerender(<Button color="warning">W</Button>);
    btn = screen.getByRole('button', { name: 'W' });
    expect(btn.className).toMatch(/warning/);

    rerender(<Button color="error">E</Button>);
    btn = screen.getByRole('button', { name: 'E' });
    expect(btn.className).toMatch(/error/);
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
    expect(screen.queryByTestId('start')).not.toBeNull();
    expect(screen.queryByTestId('end')).not.toBeNull();
  });

  it('shows loading spinner at start or end based on loadingPosition', () => {
    const { rerender } = render(
      <Button loading loadingPosition="start">
        Start
      </Button>,
    );
    let btn = screen.getByRole('button', { name: 'Start' });
    expect(btn.className).toMatch(/loading/);

    rerender(
      <Button loading loadingPosition="end">
        End
      </Button>,
    );
    btn = screen.getByRole('button', { name: 'End' });
    expect(btn.className).toMatch(/loading/);
  });

  it('sets fullWidth class when fullWidth is true', () => {
    render(<Button fullWidth>Wide</Button>);
    const btn = screen.getByRole('button', { name: 'Wide' });
    expect(btn.className).toMatch(/fullWidth/);
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
