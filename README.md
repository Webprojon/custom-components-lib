# Custom Components Library

# @webprojon/ui-lib

A modern, lightweight, and customizable UI components library for React with TypeScript support.

##  Installation

```bash
npm install @webprojon/ui-lib
```

##  Usage

```tsx
import { Button, TextField, Modal, Checkbox, Select, Switch } from '@webprojon/ui-lib';
import '@webprojon/ui-lib/dist/style.css';

export default function App() {
  return (
    <div>
      <Button>Click Me</Button>
      <TextField label="Name" />
      <Modal open={true}>Content</Modal>
    </div>
  );
}
```

##  Components

### Button

A versatile button component with multiple variants, sizes, and colors.

```tsx
import { Button } from '@webprojon/ui-lib';

// Basic usage
<Button>Click me</Button>

// With variants
<Button variant="contained">Contained</Button>
<Button variant="outlined">Outlined</Button>
<Button variant="text">Text</Button>

// With sizes
<Button size="small">Small</Button>
<Button size="medium">Medium</Button>
<Button size="large">Large</Button>

// With colors
<Button color="primary">Primary</Button>
<Button color="secondary">Secondary</Button>
<Button color="success">Success</Button>
<Button color="error">Error</Button>

// With icons
<Button startIcon={<Icon />}>With Start Icon</Button>
<Button endIcon={<Icon />}>With End Icon</Button>

// Loading state
<Button loading>Loading...</Button>
<Button loading loadingPosition="end">Loading...</Button>

// Full width
<Button fullWidth>Full Width Button</Button>
```

**Props:**

- `variant?: 'text' | 'outlined' | 'contained'` - Button style variant
- `size?: 'small' | 'medium' | 'large'` - Button size
- `color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error'` - Button color
- `loading?: boolean` - Show loading spinner
- `loadingPosition?: 'start' | 'end'` - Position of loading spinner
- `startIcon?: React.ReactNode` - Icon at the start
- `endIcon?: React.ReactNode` - Icon at the end
- `fullWidth?: boolean` - Make button full width
- `disabled?: boolean` - Disable the button

---

### TextField

A flexible input field component with floating labels and validation states.

```tsx
import { TextField } from '@webprojon/ui-lib';

// Basic usage
<TextField label="Name" placeholder="Enter your name" />

// With variants
<TextField variant="outlined" label="Outlined" />
<TextField variant="filled" label="Filled" />
<TextField variant="standard" label="Standard" />

// With sizes
<TextField size="small" label="Small" />
<TextField size="medium" label="Medium" />
<TextField size="large" label="Large" />

// With colors
<TextField color="primary" label="Primary" />
<TextField color="error" label="Error" error />

// With helper text
<TextField
  label="Email"
  helperText="Enter a valid email address"
  error
/>

// With adornments
<TextField
  label="Price"
  startAdornment="$"
  endAdornment="USD"
/>

// Multiline
<TextField
  label="Message"
  multiline
  rows={4}
  placeholder="Enter your message"
/>

// Controlled
const [value, setValue] = useState('');
<TextField
  label="Controlled"
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>
```

**Props:**

- `variant?: 'outlined' | 'filled' | 'standard'` - Input style variant
- `size?: 'small' | 'medium' | 'large'` - Input size
- `color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error'` - Input color
- `label?: React.ReactNode` - Floating label
- `placeholder?: string` - Placeholder text
- `helperText?: React.ReactNode` - Helper text below input
- `error?: boolean` - Error state
- `multiline?: boolean` - Render as textarea
- `rows?: number` - Number of rows for multiline
- `startAdornment?: React.ReactNode` - Content before input
- `endAdornment?: React.ReactNode` - Content after input
- `fullWidth?: boolean` - Make input full width
- `disabled?: boolean` - Disable the input
- `required?: boolean` - Mark as required

---

### Checkbox

A checkbox component with customizable appearance and behavior.

```tsx
import { Checkbox } from '@webprojon/ui-lib';

// Basic usage
<Checkbox label="Accept terms" />

// With sizes
<Checkbox size="small" label="Small" />
<Checkbox size="medium" label="Medium" />
<Checkbox size="large" label="Large" />

// With colors
<Checkbox color="primary" label="Primary" />
<Checkbox color="success" label="Success" />
<Checkbox color="error" label="Error" />

// Label placement
<Checkbox labelPlacement="start" label="Label on start" />
<Checkbox labelPlacement="end" label="Label on end" />

// Indeterminate state
<Checkbox indeterminate label="Indeterminate" />

// Controlled
const [checked, setChecked] = useState(false);
<Checkbox
  checked={checked}
  onChange={(e, checked) => setChecked(checked)}
  label="Controlled"
/>

// With custom onChange
<Checkbox
  label="Custom handler"
  onChange={(event, checked) => {
    console.log('Checked:', checked);
  }}
/>
```

**Props:**

- `size?: 'small' | 'medium' | 'large'` - Checkbox size
- `color?: 'primary' | 'secondary' | 'error' | 'success' | 'info' | 'warning'` - Checkbox color
- `label?: React.ReactNode` - Label text
- `labelPlacement?: 'start' | 'end'` - Label position
- `indeterminate?: boolean` - Indeterminate state
- `checked?: boolean` - Controlled checked state
- `defaultChecked?: boolean` - Uncontrolled default checked state
- `onChange?: (event, checked) => void` - Change handler
- `disabled?: boolean` - Disable the checkbox
- `required?: boolean` - Mark as required

---

### Select

A dropdown select component with single and multiple selection support.

```tsx
import { Select } from '@webprojon/ui-lib';

const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

// Basic usage
<Select
  label="Choose option"
  options={options}
  placeholder="Select an option"
/>

// With variants
<Select variant="outlined" label="Outlined" options={options} />
<Select variant="filled" label="Filled" options={options} />
<Select variant="standard" label="Standard" options={options} />

// With sizes
<Select size="small" label="Small" options={options} />
<Select size="medium" label="Medium" options={options} />
<Select size="large" label="Large" options={options} />

// Multiple selection
<Select
  label="Multiple selection"
  options={options}
  multiple
  placeholder="Select multiple options"
/>

// With checkmarks
<Select
  label="With checkmarks"
  options={options}
  multiple
  withCheckmarks
/>

// Chip display for multiple
<Select
  label="Chip display"
  options={options}
  multiple
  chipDisplay
/>

// Controlled
const [value, setValue] = useState('');
<Select
  label="Controlled"
  options={options}
  value={value}
  onChange={(e, newValue) => setValue(newValue)}
/>

// With helper text
<Select
  label="With helper"
  options={options}
  helperText="Choose your preferred option"
  error
/>
```

**Props:**

- `variant?: 'outlined' | 'filled' | 'standard'` - Select style variant
- `size?: 'small' | 'medium' | 'large'` - Select size
- `color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error'` - Select color
- `label?: React.ReactNode` - Floating label
- `placeholder?: string` - Placeholder text
- `helperText?: React.ReactNode` - Helper text below select
- `options?: Array<{value, label, disabled?}>` - Select options
- `multiple?: boolean` - Allow multiple selection
- `withCheckmarks?: boolean` - Show checkmarks in multiple mode
- `chipDisplay?: boolean` - Display selected values as chips
- `value?: string | number | Array` - Controlled value
- `defaultValue?: string | number | Array` - Uncontrolled default value
- `onChange?: (event, value) => void` - Change handler
- `disabled?: boolean` - Disable the select
- `required?: boolean` - Mark as required
- `error?: boolean` - Error state

---

### Switch

A toggle switch component for boolean values.

```tsx
import { Switch } from '@webprojon/ui-lib';

// Basic usage
<Switch label="Enable notifications" />

// With sizes
<Switch size="small" label="Small switch" />
<Switch size="medium" label="Medium switch" />
<Switch size="large" label="Large switch" />

// With colors
<Switch color="primary" label="Primary" />
<Switch color="success" label="Success" />
<Switch color="error" label="Error" />

// Label placement
<Switch labelPlacement="start" label="Label on start" />
<Switch labelPlacement="end" label="Label on end" />

// Controlled
const [checked, setChecked] = useState(false);
<Switch
  checked={checked}
  onChange={(e, checked) => setChecked(checked)}
  label="Controlled switch"
/>

// Disabled
<Switch disabled label="Disabled switch" />
<Switch disabled checked label="Disabled checked" />

// Without label
<Switch />
```

**Props:**

- `size?: 'small' | 'medium' | 'large'` - Switch size
- `color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error'` - Switch color
- `label?: React.ReactNode` - Label text
- `labelPlacement?: 'start' | 'end'` - Label position
- `checked?: boolean` - Controlled checked state
- `defaultChecked?: boolean` - Uncontrolled default checked state
- `onChange?: (event, checked) => void` - Change handler
- `disabled?: boolean` - Disable the switch

---

### Modal

A modal dialog component with backdrop and keyboard navigation.

```tsx
import { Modal } from '@webprojon/ui-lib';

// Basic usage
const [open, setOpen] = useState(false);

<Modal open={open} onClose={() => setOpen(false)}>
  <div>
    <h2>Modal Title</h2>
    <p>Modal content goes here...</p>
    <button onClick={() => setOpen(false)}>Close</button>
  </div>
</Modal>

// With custom backdrop handler
<Modal
  open={open}
  onClose={() => setOpen(false)}
  onBackdropClick={() => console.log('Backdrop clicked')}
>
  <div>Content</div>
</Modal>

// Disable escape key
<Modal
  open={open}
  onClose={() => setOpen(false)}
  disableEscapeKeyDown
>
  <div>Cannot close with Escape key</div>
</Modal>

// Keep mounted (for animations)
<Modal
  open={open}
  onClose={() => setOpen(false)}
  keepMounted
>
  <div>Stays in DOM when closed</div>
</Modal>

// With accessibility attributes
<Modal
  open={open}
  onClose={() => setOpen(false)}
  aria-labelledby="modal-title"
  aria-describedby="modal-description"
>
  <div>
    <h2 id="modal-title">Accessible Modal</h2>
    <p id="modal-description">This modal has proper accessibility attributes.</p>
  </div>
</Modal>
```

**Props:**

- `open: boolean` - Whether modal is open (required)
- `onClose?: () => void` - Close handler
- `children: React.ReactNode` - Modal content (required)
- `onBackdropClick?: () => void` - Backdrop click handler
- `disableEscapeKeyDown?: boolean` - Disable closing with Escape key
- `keepMounted?: boolean` - Keep component in DOM when closed
- `aria-labelledby?: string` - ID of element that labels the modal
- `aria-describedby?: string` - ID of element that describes the modal

---

## 🎨 Styling

All components use CSS Modules and come with a default theme. You can customize the appearance by:

1. **Importing the CSS file:**

```tsx
import '@webprojon/ui-lib/dist/style.css';
```

2. **Using custom className:**

```tsx
<Button className="my-custom-button">Custom Button</Button>
```

3. **Overriding CSS variables:**

```css
:root {
  --primary-color: #your-color;
  --border-radius: 8px;
}
```

## 🔧 TypeScript Support

This library is built with TypeScript and provides full type definitions:

```tsx
import { ButtonProps, TextFieldProps } from '@webprojon/ui-lib';

const MyButton: React.FC<ButtonProps> = (props) => {
  return <Button {...props} />;
};
```

## Installation

```bash
npm install @webprojon/ui-lib
```

## Usage

```tsx
import { Button } from '@webprojon/ui-lib';

function App() {
  return <Button>Click me</Button>;
}
```
