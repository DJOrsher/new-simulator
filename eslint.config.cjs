module.exports = [
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: require("@typescript-eslint/parser"),
      parserOptions: { sourceType: "module" }
    },
    rules: {}
  }
];
