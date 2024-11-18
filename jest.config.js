module.exports = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testRegex: '(/__tests__/.*|(\\.|/))(test|spec)\\.(ts|tsx|js|jsx)$',
  collectCoverage: true,
  coverageDirectory: 'coverage',
};