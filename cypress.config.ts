import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    screenshotsFolder: 'cypress/report/screenshots',
    reporter: 'mochawesome',
    reporterOptions: {
      html: false,
      json: true,
      reportDir: 'cypress/report',
      reportFilename: 'report',
      overwrite: true,
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    defaultCommandTimeout: 10000,
  },

  component: {
    devServer: {
      framework: 'create-react-app',
      bundler: 'webpack',
    },
  },
})
