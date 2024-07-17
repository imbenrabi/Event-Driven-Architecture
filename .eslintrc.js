module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json"],
  },
  plugins: ["@typescript-eslint", "prettier"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "prettier",
    "plugin:prettier/recommended",
  ],
  ignorePatterns: [
    ".eslintrc.js",
    "package-lock.json",
    "node_modules/",
    "dist/",
    "coverage/",
    "commitlint.config.ts",
    "vitest.config.ts",
  ],
  rules: {
    "prettier/prettier": "error",
    // Other custom rules
  },
  overrides: [
    {
      files: ["packages/client/**/*.ts", "packages/client/**/*.tsx"],
      parserOptions: {
        project: ["./packages/client/tsconfig.json"],
      },
      extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "prettier",
        "plugin:prettier/recommended",
      ],
      rules: {
        "prettier/prettier": "error",
        "@typescript-eslint/require-await": "off",
        "@typescript-eslint/no-floating-promises": "off",
        // Client-specific rules
      },
    },
    {
      files: ["packages/server/**/*.ts"],
      parserOptions: {
        project: ["./packages/server/tsconfig.json"],
      },
      extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "prettier",
        "plugin:prettier/recommended",
      ],
      rules: {
        "prettier/prettier": "error",
        "@typescript-eslint/require-await": "off",
        "@typescript-eslint/no-floating-promises": "off",
        // Server-specific rules
      },
    },
    {
      files: ["packages/kafka/**/*.ts"],
      parserOptions: {
        project: ["./packages/kafka/tsconfig.json"],
      },
      extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "prettier",
        "plugin:prettier/recommended",
      ],
      rules: {
        "prettier/prettier": "error",
        "@typescript-eslint/require-await": "off",
        "@typescript-eslint/no-floating-promises": "off",
        // Server-specific rules
      },
    },
    {
      files: ["packages/providers/**/*.ts"],
      parserOptions: {
        project: ["./packages/providers/tsconfig.json"],
      },
      extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "prettier",
        "plugin:prettier/recommended",
      ],
      rules: {
        "prettier/prettier": "error",
        "@typescript-eslint/require-await": "off",
        "@typescript-eslint/no-floating-promises": "off",
        // Providers-specific rules
      },
    },
  ],
};
