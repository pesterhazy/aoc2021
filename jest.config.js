module.exports = {
  setupFilesAfterEnv: [
    '<rootDir>support/check-assertions-number.js',
  ],
  modulePathIgnorePatterns: ["<rootDir>/dist/"],
  "testPathIgnorePatterns": [
    "\\/\\.#"
  ],
  testEnvironment: 'node',
};
