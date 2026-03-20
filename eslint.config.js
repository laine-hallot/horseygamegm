import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';
import perfectionist from 'eslint-plugin-perfectionist';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      //js.configs.recommended,
      tseslint.configs.base,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      perfectionist,
    },
    rules: {
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        {
          prefer: 'type-imports',
          fixStyle: 'separate-type-imports',
        },
      ],
      'perfectionist/sort-imports': [
        'warn',
        {
          groups: [
            'type-import',
            'type-internal',
            'type-workspace',
            ['type-parent', 'type-sibling', 'type-index'],
            ['value-builtin', 'value-external'],
            'value-workspace',
            'value-internal',
            ['value-parent', 'value-sibling', 'value-index'],
            'ts-equals-import',
            'style',
            'unknown',
          ],
          customGroups: [
            {
              groupName: 'type-workspace',
              modifiers: ['type'],
              elementNamePattern: '^@laine-hallot/.*',
            },
            {
              groupName: 'value-workspace',
              modifiers: ['value'],
              elementNamePattern: '^@laine-hallot/.*',
            },
          ],
        },
      ],
    },
  },
]);
