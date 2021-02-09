module.exports = {
  clearMocks: true,
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
  moduleFileExtensions: ['ts', 'js'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testMatch: ['**/test/**/*.(spec|test).(ts|js)', '**/src/**/*.(spec|test).(ts|js)'],
  testEnvironment: 'node',
  collectCoverage: true,
  setupFiles: ['./test/setup.ts'],
};
