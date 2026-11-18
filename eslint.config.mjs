import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import nextPlugin from "@next/eslint-plugin-next";
import reactHooks from "eslint-plugin-react-hooks";
import prettierRecommended from "eslint-plugin-prettier/recommended";

const compat = new FlatCompat({
  baseDirectory: dirname(fileURLToPath(import.meta.url)),
  recommendedConfig: js.configs.recommended
});

export default [
  {
    ignores: ["node_modules/", ".next/", "out/", "dist/", "lib/", "coverage/", "**/*.d.ts", "next-env.d.ts"]
  },
  js.configs.recommended,
  // airbnb only ships legacy (eslintrc) configs, so it is loaded through FlatCompat.
  ...compat.extends("airbnb", "plugin:react/recommended"),
  nextPlugin.configs.recommended,
  prettierRecommended,
  {
    files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"],
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      "react-hooks": reactHooks
    },
    languageOptions: {
      parser: tseslint.parser,
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: { jsx: true }
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
        JSX: true,
        RequestInit: true,
        RequestCache: true
      }
    },
    settings: {
      react: { version: "19.3" },
      "import/resolver": {
        typescript: {},
        node: {
          extensions: [".js", ".jsx", ".json", ".ts", ".tsx"]
        }
      }
    },
    rules: {
      "@typescript-eslint/no-use-before-define": ["error"],
      "import/no-import-module-exports": 0,
      "import/no-unresolved": 0,
      "no-unused-vars": ["error", { vars: "all", args: "none", caughtErrors: "none", ignoreRestSiblings: false }],
      camelcase: ["error", { properties: "never", allow: ["^unstable_"] }],
      "import/prefer-default-export": 0,
      "jsx-a11y/click-events-have-key-events": 0,
      "jsx-a11y/no-static-element-interactions": 0,
      "react/react-in-jsx-scope": 0,
      "react/button-has-type": 0,
      "no-useless-escape": 0,
      "no-param-reassign": 0,
      "no-restricted-exports": 0,
      "no-use-before-define": 0,
      "react/function-component-definition": 0,
      "react/jsx-filename-extension": 0,
      "no-console": ["error", { allow: ["warn", "error", "info"] }],
      "react-hooks/exhaustive-deps": 0,
      "react/jsx-no-bind": 0,
      "react/jsx-no-constructed-context-values": 0,
      "react/jsx-props-no-spreading": 0,
      "react/require-default-props": 0,
      "import/extensions": 0,
      "prettier/prettier": ["error", { endOfLine: "auto" }]
    }
  },
  {
    files: ["eslint.config.mjs", "next.config.js", "postcss.config.mjs"],
    rules: {
      "import/no-extraneous-dependencies": 0
    }
  },
  {
    files: ["**/types.ts"],
    rules: {
      "no-unused-vars": 0
    }
  }
];
