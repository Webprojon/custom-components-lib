import React from 'react';
import Button from './components/Button/Button';

export default function App() {
  return (
    <div>
      <h1>Buttons</h1>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <Button variant="text">Text Button</Button>
        <Button variant="outlined">Outlined Button</Button>
        <Button variant="contained">Contained Button</Button>
        <Button variant="contained" color="secondary">
          Secondary Button
        </Button>
        <Button variant="contained" color="success">
          Success Button
        </Button>
        <Button variant="contained" color="error">
          Error Button
        </Button>
        <Button variant="contained" size="small">
          Small Button
        </Button>
        <Button variant="contained" size="medium">
          Medium Button
        </Button>
        <Button variant="contained" size="large">
          Large Button
        </Button>
        <Button variant="contained" disabled>
          Disabled Button
        </Button>
        <Button variant="contained" loading>
          Loading
        </Button>
      </div>
    </div>
  );
}
