import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { describe, it, expect, jest } from '@jest/globals';
import { Modal } from './Modal';

describe('Modal', () => {
  const setup = (ui: React.ReactElement) => {
    const user = userEvent.setup();
    const result = render(ui);
    return { user, ...result };
  };

  it('renders in portal when open and applies aria attributes', () => {
    render(
      <Modal open aria-labelledby="title" aria-describedby="desc">
        <div id="title">Title</div>
        <div id="desc">Description</div>
      </Modal>,
    );
    const content = screen.getByRole('dialog');
    expect(content).toBeTruthy();
    expect(content.getAttribute('aria-labelledby')).toBe('title');
    expect(content.getAttribute('aria-describedby')).toBe('desc');
  });

  it('does not render when closed and keepMounted is false', () => {
    render(<Modal open={false}>Hidden</Modal>);
    expect(screen.queryByText('Hidden')).toBeNull();
  });

  it('keeps mounted when keepMounted=true but visually hidden', () => {
    render(
      <Modal open={false} keepMounted>
        <div>Hidden</div>
      </Modal>,
    );
    expect(screen.getByText('Hidden')).toBeTruthy();
  });

  it('calls onClose when Escape pressed', async () => {
    const onClose = jest.fn();
    const { user } = setup(
      <Modal open onClose={onClose}>
        <div>Body</div>
      </Modal>,
    );
    await user.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalled();
  });

  it('calls onBackdropClick when clicking backdrop', async () => {
    const onBackdropClick = jest.fn();
    const { user } = setup(
      <Modal open onBackdropClick={onBackdropClick}>
        <div>Body</div>
      </Modal>,
    );
    const backdrop = document.querySelector('[aria-hidden="false"]') as HTMLElement;
    await user.click(backdrop);
    expect(onBackdropClick).toHaveBeenCalled();
  });
});
