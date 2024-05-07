/** @type {import('jest').Config} */

const config = {
  preset: 'ts-jest',
  bail: true,
  clearMocks: true,
  collectCoverage: false,
  coverageProvider: "v8",
  testMatch: [
    "<rootDir>/api/src/tests/*.spec.ts"
  ],
  transform: {
    "^.+\\.(ts|tsx)$" : "ts-jest",
    "^.+\\.(js|jsx)$" : "babel-jest"
  },
  verbose: true,
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  moduleDirectories: ["node_modules", "src"],
};

module.exports = config;
