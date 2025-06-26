import typescript from "@typescript-eslint/eslint-plugin";
import playwright from "eslint-plugin-playwright";
import typescriptParser from "@typescript-eslint/parser";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

const { configs: typescriptConfigs } = typescript;

export default [
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      "@typescript-eslint": typescript,
      "playwright": playwright,
      "prettier": prettierPlugin
    },
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module"
      }
    },
    rules: {
      ...typescriptConfigs.recommended.rules,
      ...playwright.configs["flat/recommended"].rules,
      ...prettierConfig.rules,

      "prettier/prettier": "warn",
      "no-console": "warn",
      "@typescript-eslint/no-explicit-any": "off",

      // Require return types for functions and module boundaries
      "@typescript-eslint/explicit-function-return-type": [
        "error",
        {
          allowExpressions: false,
          allowTypedFunctionExpressions: true,
          allowHigherOrderFunctions: true
        }
      ],
      "@typescript-eslint/explicit-module-boundary-types": "error",

      // Require type annotations for parameters and properties
      "@typescript-eslint/typedef": [
        "error",
        {
          arrowParameter: true,
          memberVariableDeclaration: true,
          propertyDeclaration: true,
          parameter: true
          // variableDeclaration intentionally omitted to skip const enforcement
        }
      ]
    }
  }
];
