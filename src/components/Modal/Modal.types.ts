import React from 'react';

export interface ModalProps {
  open: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  onBackdropClick?: () => void;
  disableEscapeKeyDown?: boolean;
  keepMounted?: boolean;
}
