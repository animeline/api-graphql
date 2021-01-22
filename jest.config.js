const { pathsToModuleNameMapper } = require('ts-jest/utils');

const { compilerOptions } = require('./tsconfig.json');

module.exports = {
  bail: true,
  clearMocks: true,
  collectCoverage: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  coverageDirectory: 'coverage',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/src',
  }),
  coverageReporters: ['json', 'lcov'],
  testMatch: ['**/__tests__/**/?(*.)+(spec|test).ts'],
  setupFilesAfterEnv: ['<rootDir>/__tests__/config/setup.ts'],
  collectCoverageFrom: ['src/**/*.(ts|js)'],
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
};
