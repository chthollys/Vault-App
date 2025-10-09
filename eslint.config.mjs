import eslint from "@eslint/js";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import globals from "globals";
import tseslint from "@typescript-eslint/eslint-plugin";
import { FlatCompat } from "@eslint/eslintrc";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: ["**/dist/**", "**/node_modules/**", ".next", "eslint.config.mjs"],
  },
  // Global configurations
  eslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  // Next.js specific configuration
  {
    files: ["src/**/*.{ts,tsx}"],
    ...compat
      .extends("next/core-web-vitals", "next/typescript")
      .reduce((acc, config) => ({ ...acc, ...config }), {}),
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },
  // NestJS specific configuration
  {
    files: ["server/src/**/*.ts"],
    languageOptions: {
      sourceType: "module",
    },
    rules: {
      "@typescript-eslint/interface-name-prefix": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
  // General rules for both projects
  {
    rules: {
      "@typescript-eslint/no-floating-promises": "warn",
      "@typescript-eslint/no-unsafe-argument": "warn",
    },
  },
];

export default eslintConfig;
