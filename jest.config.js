/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  setupFilesAfterEnv: [
    '<rootDir>support/check-assertions-number.js',
  ],
  "testPathIgnorePatterns": [
    "\\/\\.#"
  ],
  preset: 'ts-jest',
  testEnvironment: 'node',
};
