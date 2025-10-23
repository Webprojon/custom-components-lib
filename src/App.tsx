import React, { useState, PropsWithChildren } from 'react';
import { Button } from './components/Button';
import { Checkbox } from './components/Checkbox';
import { Switch } from './components/Switch';
import { TextField } from './components/TextField';
import { Select } from './components/Select';
import type { SelectOption } from './components/Select/Select.types';
import { Modal } from './components/Modal';
import * as styles from './App.module.scss';

const sizes: Array<'small' | 'medium' | 'large'> = ['small', 'medium', 'large'];
const buttonVariants: Array<'text' | 'outlined' | 'contained'> = ['text', 'outlined', 'contained'];
const colors: Array<'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error'> = [
  'primary',
  'secondary',
  'success',
  'info',
  'warning',
  'error',
];
const fieldVariants: Array<'outlined' | 'filled' | 'standard'> = ['outlined', 'filled', 'standard'];

const selectOptions: Array<SelectOption<string>> = [
  { value: 'a', label: 'Alpha' },
  { value: 'b', label: 'Beta' },
  { value: 'c', label: 'Gamma' },
];

function Section({ title, children }: PropsWithChildren<{ title: string }>) {
  return (
    <section className={styles.section}>
      <h2>{title}</h2>
      {children}
    </section>
  );
}

export default function App() {
  const [switchChecked, setSwitchChecked] = useState(false);
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [selectValue, setSelectValue] = useState<string | undefined>();
  const [selectMulti, setSelectMulti] = useState<string[]>([]);
  const [openOuter, setOpenOuter] = useState(false);
  const [openInner, setOpenInner] = useState(false);
  const [openSimple, setOpenSimple] = useState(false);

  return (
    <div className={styles.appRoot}>
      <h1>Custom Components Library</h1>

      <Section title="Button">
        <div className={styles.gridGap12}>
          {buttonVariants.map((variant) => (
            <div key={`btn-${variant}`}>
              <h3 className={styles.h3Tight}>Variant: {variant}</h3>
              <div className={styles.rowWrap8}>
                {sizes.map((size) => (
                  <div key={`btn-${variant}-${size}`} className={styles.flexRow8}>
                    {colors.map((color) => (
                      <Button
                        key={`btn-${variant}-${size}-${color}`}
                        variant={variant}
                        size={size}
                        color={color}
                      >
                        {variant}-{size}-{color}
                      </Button>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.threeBtn}>
          <Button loading loadingPosition="start">
            Loading start
          </Button>
          <Button loading loadingPosition="end">
            Loading end
          </Button>
          <Button startIcon={<span>★</span>} endIcon={<span>→</span>}>
            With Icons
          </Button>
        </div>
      </Section>

      <Section title="Checkbox">
        <div className={styles.rowCenter16}>
          <Checkbox
            label="Controlled"
            checked={checkboxChecked}
            onChange={(_, checked) => setCheckboxChecked(checked)}
          />
          <Checkbox label="Default" defaultChecked />
          <Checkbox label="Indeterminate" indeterminate />
          <Checkbox label="Disabled" disabled />
          {sizes.map((size) => (
            <Checkbox key={`cb-${size}`} label={size} size={size} />
          ))}
          {colors.map((color) => (
            <Checkbox key={`cb-${color}`} label={color} color={color} />
          ))}
          <Checkbox label="Label start" labelPlacement="start" />
        </div>
      </Section>

      <Section title="Switch">
        <div className={styles.rowCenter16}>
          <Switch
            label="Controlled"
            checked={switchChecked}
            onChange={(_, checked) => setSwitchChecked(checked)}
          />
          <Switch label="Default" defaultChecked />
          <Switch label="Disabled" disabled />
          {sizes.map((size) => (
            <Switch key={`sw-${size}`} label={size} size={size} />
          ))}
          {colors.map((color) => (
            <Switch key={`sw-${color}`} label={color} color={color} defaultChecked />
          ))}
          <Switch label="Label start" labelPlacement="start" />
        </div>
      </Section>

      <Section title="TextField">
        <div className={styles.gridGap12}>
          {fieldVariants.map((variant) => (
            <div key={`tf-${variant}`}>
              <h3 className={styles.h3Tight}>Variant: {variant}</h3>
              <div className={styles.rowWrap12}>
                {sizes.map((size) => (
                  <TextField
                    key={`tf-${variant}-${size}`}
                    variant={variant}
                    size={size}
                    label={`${variant} ${size}`}
                    placeholder="Placeholder"
                  />
                ))}
                {colors.map((color) => (
                  <TextField
                    key={`tf-${variant}-${color}`}
                    variant={variant}
                    color={color}
                    label={`${variant} ${color}`}
                  />
                ))}
                <TextField label="With helper" helperText="Helper text" />
                <TextField label="Error" error helperText="Error text" />
                <TextField
                  label="Start/End"
                  startAdornment={<span>£</span>}
                  endAdornment={<span>.00</span>}
                />
                <TextField label="Multiline" multiline rows={3} placeholder="Type here..." />
                <TextField label="Full width" fullWidth placeholder="Full width" />
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Select">
        <div className={styles.gridGap12}>
          {fieldVariants.map((variant) => (
            <div key={`sel-${variant}`}>
              <h3 className={styles.h3Tight}>Variant: {variant}</h3>
              <div className={styles.rowWrap12}>
                <Select
                  id={`sel-${variant}`}
                  variant={variant}
                  options={selectOptions}
                  label="Select"
                  value={selectValue}
                  onChange={(_, v) => setSelectValue(v as string)}
                />
                <Select
                  variant={variant}
                  options={selectOptions}
                  multiple
                  chipDisplay
                  withCheckmarks
                  label="Select Multiple"
                  value={selectMulti}
                  onChange={(_, v) => setSelectMulti(v as string[])}
                />
                {sizes.map((size) => (
                  <Select
                    key={`sel-${variant}-${size}`}
                    variant={variant}
                    size={size}
                    options={selectOptions}
                    label={`Select ${size}`}
                  />
                ))}
                {colors.map((color) => (
                  <Select
                    key={`sel-${variant}-${color}`}
                    variant={variant}
                    color={color}
                    options={selectOptions}
                    label={`Select ${color}`}
                  />
                ))}
                <Select
                  variant={variant}
                  error
                  helperText="Error text"
                  options={selectOptions}
                  label="Select Error"
                />
                <Select
                  variant={variant}
                  fullWidth
                  width={320}
                  options={selectOptions}
                  label="Select Full Width"
                />
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Modal">
        <div className={styles.rowCenter16}>
          <Button onClick={() => setOpenSimple(true)}>Open Modal</Button>
          <Modal
            open={openSimple}
            onClose={() => setOpenSimple(false)}
            aria-labelledby="simple-title"
            aria-describedby="simple-desc"
          >
            <h3 id="simple-title" className={styles.h3NoTop}>
              Simple modal
            </h3>
            <p id="simple-desc">Basic confirmation dialog.</p>
            <div className={styles.rowEnd8}>
              <Button variant="text" onClick={() => setOpenSimple(false)}>
                Cancel
              </Button>
              <Button variant="contained" color="success" onClick={() => setOpenSimple(false)}>
                Confirm
              </Button>
            </div>
          </Modal>
        </div>

        <br />

        <div className={styles.rowCenter16}>
          <Button onClick={() => setOpenOuter(true)}>Open Nested Modal</Button>
        </div>

        <div className={styles.rowCenter16}>
          <Modal
            open={openOuter}
            onClose={() => setOpenOuter(false)}
            aria-labelledby="outer-title"
            aria-describedby="outer-desc"
          >
            <h3 id="outer-title" className={styles.h3NoTop}>
              Confirm action
            </h3>
            <p id="outer-desc">
              Are you sure you want to proceed? You can cancel or open child modal.
            </p>
            <div className={styles.rowEnd8}>
              <Button variant="text" onClick={() => setOpenOuter(false)}>
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
          </Modal>

          <Modal
            open={openInner}
            onClose={() => setOpenInner(false)}
            aria-labelledby="inner-title"
            aria-describedby="inner-desc"
          >
            <h3 id="inner-title" className={styles.h3NoTop}>
              Inner modal
            </h3>
            <p id="inner-desc">Top-most modal. Backdrop close affects this one first.</p>
            <div className={styles.rowEnd8}>
              <Button variant="text" onClick={() => setOpenInner(false)}>
                Close inner
              </Button>
              <Button
                color="primary"
                onClick={() => {
                  setOpenInner(false);
                  setOpenOuter(false);
                }}
              >
                Confirm
              </Button>
            </div>
          </Modal>
        </div>
      </Section>
    </div>
  );
}
