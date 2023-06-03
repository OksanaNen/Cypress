const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "as4p1t",
  e2e: {
    baseUrl: 'https://santa-secret.ru',
    watchForFileChanges: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
