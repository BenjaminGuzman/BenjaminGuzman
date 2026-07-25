const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    specPattern: "cypress/integration/**/*.ts",
    baseUrl: "http://localhost:4200",
    supportFile: "cypress/support/index.ts",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
