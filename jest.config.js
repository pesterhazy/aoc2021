/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  setupFilesAfterEnv: [
    '<rootDir>support/check-assertions-number.js',
  ],
  preset: 'ts-jest',
  testEnvironment: 'node',
};
