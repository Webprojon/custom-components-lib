/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|scss|sass)$': 'identity-obj-proxy',
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testRegex: '.*\\.test\\.(ts|tsx)$',
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.stories.tsx',
    '!src/**/index.ts',
    '!src/**/types.ts',
    '!src/types/**/*',
  ],
};
