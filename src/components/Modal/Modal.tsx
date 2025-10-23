import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import * as styles from './Modal.module.scss';
import { ModalProps } from './Modal.types';

const modalStack: Array<number> = [];
let stackIdCounter = 0;
let originalBodyOverflow: string | null = null;

const pushModal = (): number => {
  const id = ++stackIdCounter;
  modalStack.push(id);
  if (modalStack.length === 1) {
    originalBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
  }
  return id;
};

const popModal = (id: number) => {
  const index = modalStack.indexOf(id);
  if (index !== -1) modalStack.splice(index, 1);
  if (modalStack.length === 0 && originalBodyOverflow !== null) {
    document.body.style.overflow = originalBodyOverflow;
    originalBodyOverflow = null;
  }
};

const isTopModal = (id: number | null): boolean => {
  if (id == null) return false;
  const last = modalStack[modalStack.length - 1];
  return last === id;
};

export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  children,
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
  onBackdropClick,
  disableEscapeKeyDown,
  keepMounted,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);

  const instanceIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!open) return;
    previousActiveElementRef.current = document.activeElement as HTMLElement | null;
    instanceIdRef.current = pushModal();
    const focusTimer = window.setTimeout(() => {
      contentRef.current?.focus();
    }, 0);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isTopModal(instanceIdRef.current) && !disableEscapeKeyDown) {
        if (typeof onClose === 'function') onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener('keydown', handleKeyDown);
      if (instanceIdRef.current !== null) {
        popModal(instanceIdRef.current);
        instanceIdRef.current = null;
      }
      previousActiveElementRef.current?.focus?.();
    };
  }, [open, onClose, disableEscapeKeyDown]);

  if (!open && !keepMounted) return null;

  const handleBackdropClick = () => {
    if (isTopModal(instanceIdRef.current)) {
      const backdropFn = onBackdropClick as (() => void) | undefined;
      if (backdropFn) backdropFn();
      const closeFn = onClose as (() => void) | undefined;
      if (closeFn) closeFn();
    }
  };

  const handleContentClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
    event.stopPropagation();
  };

  const modal = (
    <div className={styles.backdrop} onClick={handleBackdropClick} aria-hidden={false}>
      <div
        ref={contentRef}
        className={styles.content}
        role="dialog"
        aria-modal="true"
        aria-labelledby={ariaLabelledby}
        aria-describedby={ariaDescribedby}
        tabIndex={-1}
        onClick={handleContentClick}
      >
        {children}
      </div>
    </div>
  );

  if (typeof document === 'undefined') return null;
  return createPortal(modal, document.body);
};

export default Modal;
