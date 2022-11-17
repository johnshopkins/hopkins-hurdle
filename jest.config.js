module.exports = {
  moduleNameMapper: {
    // see: https://stackoverflow.com/a/54646930
    '\\.(css|scss)$': '<rootDir>/tests/jest/__mocks__/styleMock.js',
  }
};
