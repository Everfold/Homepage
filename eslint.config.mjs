// @ts-check
import js from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import astro from "eslint-plugin-astro";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig(
  globalIgnores([
    "dist/**",
    ".astro/**",
    ".direnv/**",
    ".agents/**",
    "coverage/**",
    "playwright-report/**",
    "test-results/**",
    "blob-report/**",
  ]),

  {
    files: ["**/*.{js,mjs,cjs,jsx,ts,mts,cts,tsx,astro}"],
    extends: [js.configs.recommended],
    languageOptions: {
      globals: globals.node,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
  },

  {
    files: ["**/*.{ts,mts,cts,tsx,astro}"],
    extends: [tseslint.configs.recommended],
  },

  ...astro.configs.recommended,

  {
    files: ["**/*.astro"],
    languageOptions: {
      parserOptions: { parser: tseslint.parser },
    },
    rules: {
      // TypeScript checks undefined names, including type-only references.
      "no-undef": "off",
    },
  },

  {
    files: ["src/**/*.{js,jsx,ts,tsx}", "**/*.astro/*.{js,ts}"],
    languageOptions: { globals: globals.browser },
  },
);
