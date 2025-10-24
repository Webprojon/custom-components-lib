import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  outDir: 'dist',
  external: ['react', 'react-dom', 'clsx'],
  esbuildOptions(options) {
    options.loader = {
      ...options.loader,
      '.scss': 'text',
    };
  },
});
