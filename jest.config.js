/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('jest').Config} */
const config = {
  coverageProvider: "v8",
  bail: true,
  clearMocks: true,
  testMatch: [
    "<rootDir>/api/**/*.spec.js"
  ]
};

module.exports = config;
