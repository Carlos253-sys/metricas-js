const js = require("@eslint/js");
const globals = require("globals");

module.exports = [
  js.configs.recommended,
  {
    files: ["src/**/*.js"],
    languageOptions: { sourceType: "commonjs", globals: globals.node },
    rules: {
      complexity: ["warn", 10],              // CC máxima por función
      "max-depth": ["warn", 3],              // anidamiento máximo
      "max-lines-per-function": ["warn", 40],
      "max-params": ["warn", 4],
      eqeqeq: "error",                       // obliga a usar ===
      "no-unused-vars": "error"
    }
  }
];
