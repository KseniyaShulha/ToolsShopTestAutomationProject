// eslint.config.js (flat)
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import playwright from 'eslint-plugin-playwright';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

const { configs: typescriptConfigs } = typescript;

export default [
  { ignores: ['node_modules', 'dist', 'build', 'coverage'] },

  // --- Base (strict) rules for app/lib code ---
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      '@typescript-eslint': typescript,
      playwright,
      prettier: prettierPlugin,
    },
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    rules: {
      ...typescriptConfigs.recommended.rules,
      ...playwright.configs['flat/recommended'].rules,
      ...prettierConfig.rules,

      'prettier/prettier': 'warn',
      'no-console': 'off',

      // ✅ allow `any`
      '@typescript-eslint/no-explicit-any': 'off',

      // strict typing in app code
      '@typescript-eslint/explicit-function-return-type': [
        'error',
        {
          allowExpressions: false,
          allowTypedFunctionExpressions: true,
          allowHigherOrderFunctions: true,
        },
      ],
      '@typescript-eslint/explicit-module-boundary-types': 'error',
      '@typescript-eslint/typedef': [
        'error',
        {
          arrowParameter: true,
          memberVariableDeclaration: true,
          propertyDeclaration: true,
          parameter: true,
        },
      ],
    },
  },

  // --- Test overrides (relaxed) ---
  {
    files: [
      '**/*.spec.ts',
      '**/*.spec.tsx',
      '**/*.test.ts',
      '**/*.test.tsx',
      'playwright/**/*.{ts,tsx}',
      'e2e/**/*.{ts,tsx}',
      'tests/**/*.{ts,tsx}',
    ],
    rules: {
      // Let test callbacks infer return types
      '@typescript-eslint/explicit-function-return-type': [
        'error',
        { allowExpressions: true, allowTypedFunctionExpressions: true, allowHigherOrderFunctions: true },
      ],
      // Don’t require type annotations on Playwright fixture params like ({ request })
      '@typescript-eslint/typedef': [
        'error',
        {
          arrowParameter: false,
          memberVariableDeclaration: true,
          propertyDeclaration: true,
          parameter: false,
        },
      ],
      '@typescript-eslint/no-explicit-any': 'off',

      // ✅ allow tests without expect()
      'playwright/expect-expect': 'off',
      'playwright/no-standalone-expect': 'off',

      // ✅ disable conditional checks in tests
      'playwright/no-conditional-in-test': 'off',
      'playwright/no-conditional-expect': 'off',

      // ✅ disable skipped-test warning
      'playwright/no-skipped-test': 'off',
    },
  },
];