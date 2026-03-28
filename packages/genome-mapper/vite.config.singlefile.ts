import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';

export default defineConfig({
  base: './',
  css: {
    modules: { localsConvention: 'camelCase' },
  },
  plugins: [react(), viteSingleFile()],
});
