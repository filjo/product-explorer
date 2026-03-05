// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");
const prettierConfig = require("eslint-config-prettier/flat");

module.exports = defineConfig([
  expoConfig,
  {
    ignores: [".expo/*", "dist/*", "build/*", "node_modules/*"],
  },
  {
    rules: {
      // Hooks safety
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // Error handling and reliability
      "no-throw-literal": "error",
      "prefer-promise-reject-errors": "error",
      "no-useless-catch": "warn",
      "no-unreachable": "error",

      // General correctness
      eqeqeq: ["error", "always"],
      curly: ["error", "all"],
      "no-implicit-coercion": "error",
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-debugger": "warn",
    },
  },
  prettierConfig,
]);
