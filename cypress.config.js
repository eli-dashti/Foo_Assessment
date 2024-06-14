const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
    },
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx,features}",
    chromeWebSecurity: false,
    baseUrl: "https://www.fondsnet.com",
    defaultCommandTimeout: 8000,
    testRunner: "mocha",
  },
});
