/* eslint-disable */
/** @type {import('@ts-jest/dist/types').InitialOptionsTsJest} */
const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig');

module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: './',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  coveragePathIgnorePatterns: [
    '<rootDir>/src/database/migrations',
    '<rootDir>/src/database/log-migrations',
    '<rootDir>/src/grpc-client.options.ts',
    '<rootDir>/src/.*/dtos',
    '<rootDir>/src/.*/index.ts',
    '<rootDir>/src/.*/exceptions/*',
    '<rootDir>/src/main.ts',
  ],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageDirectory: './coverage',
  testEnvironment: 'node',
  modulePaths: ['<rootDir>'],
  moduleNameMapper: {
    '^src/(.*)': ['<rootDir>/src/$1'],
    ...pathsToModuleNameMapper(compilerOptions.paths),
  },
  maxWorkers: '50%',
  preset: 'ts-jest',
};
