# Custom Components Library

## 📋 Task

This project implements a modern, reusable React component library with TypeScript support. The library provides a comprehensive set of UI components following Apple's design principles and modern web development best practices.

**Task Link:** [Custom Components Library Development Task](https://github.com/Webprojon/custom-components-lib.git)

## How to Run the App

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Webprojon/custom-components-lib.git
   cd custom-components-lib
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start development server:**

   ```bash
   npm run dev
   ```

   This will start the webpack dev server on `http://localhost:3000`

4. **Run Storybook (Component Documentation):**

   ```bash
   npm run storybook
   ```

   This will start Storybook on `http://localhost:6006`

5. **Run tests:**

   ```bash
   npm test
   ```

6. **Build the library:**
   ```bash
   npm run build
   ```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build the library for production
- `npm run test` - Run Jest tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:cov` - Run tests with coverage
- `npm run storybook` - Start Storybook development server
- `npm run build-storybook` - Build Storybook for production
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues automatically
- `npm run format` - Format code with Prettier
- `npm run type-check` - Run TypeScript type checking

## Library Usage

### Installation as NPM Package

```bash
npm install @webprojon/ui-lib
```

### Basic Usage

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

## Project Architecture

### Technology Stack

- **React 19.2.0** - UI library
- **TypeScript 5.9.3** - Type safety and development experience
- **SCSS/CSS Modules** - Styling with modular approach
- **Webpack 5** - Module bundling and development server
- **tsup** - Fast TypeScript bundler for library builds
- **Jest** - Testing framework
- **Storybook 8.6.14** - Component documentation and development
- **ESLint + Prettier** - Code quality and formatting
- **Husky + lint-staged** - Git hooks for code quality

### Build System

The project uses a dual build system:

1. **Development Build (Webpack):**
   - Hot module replacement
   - Source maps
   - Development optimizations
   - Serves on `http://localhost:3000`

2. **Library Build (tsup):**
   - CommonJS and ES modules output
   - TypeScript declarations
   - Tree-shaking support
   - Production optimizations

### File Structure

```
custom-components-lib/
├── dist/                          # Built library files
│   ├── index.d.ts                 # TypeScript declarations
│   ├── index.d.mts                # ES module declarations
│   ├── index.js                   # CommonJS build
│   ├── index.mjs                  # ES module build
│   └── *.map                      # Source maps
├── src/                           # Source code
│   ├── components/                # Component library
│   │   ├── Button/                # Button component
│   │   │   ├── Button.tsx         # Component implementation
│   │   │   ├── Button.types.ts    # TypeScript interfaces
│   │   │   ├── Button.module.scss # Component styles
│   │   │   ├── Button.stories.tsx # Storybook stories
│   │   │   ├── Button.test.tsx    # Unit tests
│   │   │   └── index.ts           # Component exports
│   │   ├── TextField/             # Text input component
│   │   ├── Checkbox/              # Checkbox component
│   │   ├── Select/                # Dropdown select component
│   │   ├── Switch/                # Toggle switch component
│   │   ├── Modal/                 # Modal dialog component
│   │   └── index.ts               # Library exports
│   ├── styles/                    # Global styles
│   │   ├── variables.scss         # SCSS variables
│   │   └── index.module.scss      # Global styles
│   ├── types/                     # TypeScript type definitions
│   │   ├── common.ts              # Shared types
│   │   └── scss.d.ts              # SCSS module declarations
│   ├── App.tsx                    # Demo application
│   ├── App.module.scss            # Demo app styles
│   ├── index.ts                   # Main library entry point
│   └── index.tsx                  # Demo app entry point
├── storybook-static/              # Built Storybook documentation
├── package.json                   # Project configuration
├── tsconfig.json                  # TypeScript configuration
├── tsup.config.ts                 # Library build configuration
├── webpack.config.js              # Development build configuration
├── jest.config.js                 # Testing configuration
├── eslint.config.js               # ESLint configuration
└── README.md                      # Basic documentation
```

## Components Documentation

### 1. Button Component

A versatile button component with multiple variants, sizes, and states.

**Features:**

- 3 variants: `contained`, `outlined`, `text`
- 3 sizes: `small`, `medium`, `large`
- 6 colors: `primary`, `secondary`, `success`, `info`, `warning`, `error`
- Loading states with customizable spinner position
- Icon support (start and end icons)
- Full width option
- Accessibility support

**Usage:**

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
<Button color="success">Success</Button>
<Button color="error">Error</Button>

// Loading state
<Button loading>Loading...</Button>
<Button loading loadingPosition="end">Loading...</Button>

// With icons
<Button startIcon={<Icon />}>With Start Icon</Button>
<Button endIcon={<Icon />}>With End Icon</Button>

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

### 2. TextField Component

A flexible input field component with floating labels and validation states.

**Features:**

- 3 variants: `outlined`, `filled`, `standard`
- 3 sizes: `small`, `medium`, `large`
- 6 colors: `primary`, `secondary`, `success`, `info`, `warning`, `error`
- Floating labels
- Helper text support
- Error states
- Multiline support (textarea)
- Adornments (start/end content)
- Full accessibility support

**Usage:**

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

### 3. Checkbox Component

A checkbox component with customizable appearance and behavior.

**Features:**

- 3 sizes: `small`, `medium`, `large`
- 6 colors: `primary`, `secondary`, `success`, `info`, `warning`, `error`
- Label placement options
- Indeterminate state support
- Controlled and uncontrolled modes
- Accessibility support

**Usage:**

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

### 4. Select Component

A dropdown select component with single and multiple selection support.

**Features:**

- 3 variants: `outlined`, `filled`, `standard`
- 3 sizes: `small`, `medium`, `large`
- 6 colors: `primary`, `secondary`, `success`, `info`, `warning`, `error`
- Single and multiple selection
- Checkmarks for multiple selection
- Chip display for selected values
- Custom options support
- Accessibility support

**Usage:**

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

### 5. Switch Component

A toggle switch component for boolean values.

**Features:**

- 3 sizes: `small`, `medium`, `large`
- 6 colors: `primary`, `secondary`, `success`, `info`, `warning`, `error`
- Label placement options
- Controlled and uncontrolled modes
- Accessibility support

**Usage:**

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

### 6. Modal Component

A modal dialog component with backdrop and keyboard navigation.

**Features:**

- Backdrop click handling
- Escape key support
- Keep mounted option for animations
- Accessibility attributes support
- Custom backdrop behavior

**Usage:**

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

## Styling System

### Design System

The library follows Apple's design principles with:

- **Color Palette:** Primary blue (#0172eb), semantic colors for success, error, warning
- **Typography:** San Francisco font family with consistent sizing
- **Spacing:** 6px base unit with consistent spacing scale
- **Border Radius:** 4px for subtle rounded corners
- **Shadows:** Layered shadows for depth and elevation

### CSS Architecture

- **CSS Modules:** Scoped styles to prevent conflicts
- **SCSS Variables:** Centralized design tokens
- **BEM-like Naming:** Consistent class naming convention
- **Responsive Design:** Mobile-first approach

### Customization

1. **Import the CSS file:**

   ```tsx
   import '@webprojon/ui-lib/dist/style.css';
   ```

2. **Use custom className:**

   ```tsx
   <Button className="my-custom-button">Custom Button</Button>
   ```

3. **Override CSS variables:**
   ```css
   :root {
     --primary-color: #your-color;
     --border-radius: 8px;
   }
   ```

## Development Workflow

### Code Quality

- **ESLint:** Enforces code quality and consistency
- **Prettier:** Automatic code formatting
- **TypeScript:** Type safety and better development experience
- **Husky:** Git hooks for pre-commit checks
- **lint-staged:** Run linters only on staged files

### Testing

- **Jest:** Unit testing framework
- **React Testing Library:** Component testing utilities
- **Coverage Reports:** Track test coverage
- **Test Files:** Each component has comprehensive tests

### Documentation

- **Storybook:** Interactive component documentation
- **TypeScript:** Self-documenting code with types
- **README:** Comprehensive usage documentation

### Build Process

1. **Development:**
   - Webpack dev server with HMR
   - Source maps for debugging
   - Fast rebuild times

2. **Production:**
   - tsup for optimized library builds
   - Tree-shaking support
   - Multiple output formats (CJS, ESM)
   - TypeScript declarations

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - see LICENSE file for details

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## Support

For questions, issues, or contributions, please:

- Open an issue on GitHub
- Check the Storybook documentation
- Review the component examples in this README

---

**Built with ❤️ using React, TypeScript, and modern web technologies**
