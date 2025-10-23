import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Modal } from './Modal';
import type { ModalProps } from './Modal.types';
import { Button } from '../Button';

const meta: Meta<ModalProps> = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  args: {
    open: false,
    disableEscapeKeyDown: false,
    keepMounted: false,
  },
  parameters: {
    docs: {
      description: {
        component:
          'Accessible modal dialog with focus management, escape key handling, backdrop click to close, and stacking support.',
      },
    },
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<ModalProps>;

const PlaygroundExample: React.FC<ModalProps> = (args) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Button variant="outlined" onClick={() => setOpen(true)}>
        Open modal
      </Button>
      <Modal
        {...args}
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minWidth: 360 }}>
          <h3 id="modal-title" style={{ margin: 0 }}>
            Confirm action
          </h3>
          <p id="modal-desc" style={{ margin: 0 }}>
            Are you sure you want to proceed? You can cancel or confirm this action.
          </p>
          <div style={{ marginTop: 8, display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <Button variant="outlined" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button color="success" onClick={() => setOpen(false)}>
              Confirm
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export const Playground: Story = {
  render: (args) => <PlaygroundExample {...args} />,
};

const KeepMountedExample: React.FC<ModalProps> = (args) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Button variant="outlined" onClick={() => setOpen(true)}>
        Open modal
      </Button>
      <Modal {...args} open={open} keepMounted onClose={() => setOpen(false)}>
        <div>Even when closed, this remains in the DOM</div>
        <Button variant="outlined" onClick={() => setOpen(false)}>
          Close
        </Button>
      </Modal>
    </div>
  );
};

export const KeepMounted: Story = {
  render: (args) => <KeepMountedExample {...args} />,
};

const DisableEscapeExample: React.FC<ModalProps> = (args) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Button variant="outlined" onClick={() => setOpen(true)}>
        Open modal
      </Button>
      <Modal {...args} open={open} disableEscapeKeyDown onClose={() => setOpen(false)}>
        <div>Escape key will not close this modal</div>
        <Button variant="outlined" onClick={() => setOpen(false)}>
          Close
        </Button>
      </Modal>
    </div>
  );
};

export const DisableEscape: Story = {
  render: (args) => <DisableEscapeExample {...args} />,
};

const NestedExample: React.FC<ModalProps> = (args) => {
  const [openOuter, setOpenOuter] = useState<boolean>(false);
  const [openInner, setOpenInner] = useState<boolean>(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Button onClick={() => setOpenOuter(true)}>Open Nested Modal</Button>

      <Modal
        {...args}
        open={openOuter}
        onClose={() => setOpenOuter(false)}
        aria-labelledby="outer-title"
        aria-describedby="outer-desc"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minWidth: 360 }}>
          <h3 id="outer-title" style={{ margin: 0 }}>
            Confirm action
          </h3>
          <p id="outer-desc" style={{ margin: 0 }}>
            Are you sure you want to proceed? You can cancel or confirm this action.
          </p>
          <div style={{ marginTop: 8, display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <Button variant="outlined" onClick={() => setOpenOuter(false)}>
              Cancel
            </Button>
            <Button
              color="success"
              onClick={() => {
                setOpenOuter(false);
                setOpenInner(true);
              }}
            >
              Open Child Modal
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        {...args}
        open={openInner}
        onClose={() => setOpenInner(false)}
        aria-labelledby="inner-title"
        aria-describedby="inner-desc"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minWidth: 360 }}>
          <h3 id="inner-title" style={{ margin: 0 }}>
            Inner modal
          </h3>
          <p id="inner-desc" style={{ margin: 0 }}>
            Top-most modal. Backdrop close affects this one first.
          </p>
          <div style={{ marginTop: 8, display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <Button variant="outlined" onClick={() => setOpenInner(false)}>
              Close inner
            </Button>
            <Button
              color="success"
              onClick={() => {
                setOpenInner(false);
                setOpenOuter(false);
              }}
            >
              Confirm
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export const Nested: Story = {
  render: (args) => <NestedExample {...args} />,
};
