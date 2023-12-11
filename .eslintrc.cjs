module.exports = {
  ignorePatterns: [".eslintrc.cjs"],
  overrides: [
    {
      files: [
        "**/*.spec.js",
        "**/*.spec.jsx",
        "**/*.test.js",
        "**/*.polyfills.js",
        "**/test/*",
        "**/*.cy.js",
      ],
      env: {
        jest: true,
        node: true,
      },
    },
  ],
  root: true,
  env: { browser: true, es2020: true }, // Keep browser and es2020 environments at the root level
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
  ],
  parserOptions: {
    ecmaVersion: 12, // Specify the ECMAScript version
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: { react: { version: "18.2" } },
  plugins: ["react-refresh", "react", "jest"],
  rules: {
    "no-unused-vars": "warn",
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
  },
};
