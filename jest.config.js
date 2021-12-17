module.exports = {
  setupFilesAfterEnv: [
    '<rootDir>support/check-assertions-number.js',
  ],
  "testPathIgnorePatterns": [
    "\\/\\.#"
  ],
  testEnvironment: 'node',
};
