const { pathsToModuleNameMapper } = require('ts-jest/utils');

const { compilerOptions } = require('./tsconfig.json');

module.exports = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/modules/**/useCases/**/*.(ts|js)'],
  coverageDirectory: 'coverage',
  coverageReporters: ['json', 'lcov'],
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/src',
  }),
  preset: 'ts-jest',
  setupFilesAfterEnv: ['<rootDir>/src/__tests__/config/setup.ts'],
  testEnvironment: 'node',
  testMatch: ['**/?(*.)+(spec|test).ts'],
};
