/// <reference types="vitest/config" />
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(import.meta.dirname, 'src/index.ts'),
      name: 'HorseyParser',
      fileName: 'horsey-parser',
    },
  },
  test: {},
  plugins: [
    checker({
      typescript: true,
    }),
  ],
});
