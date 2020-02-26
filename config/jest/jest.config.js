const path = require('path');

module.exports = {
  rootDir: path.resolve(path.dirname(__dirname), '../'),

  roots: ['<rootDir>/src'],

  setupFiles: [
    'react-app-polyfill/jsdom',
    './config/jest/setupTests.js'
  ],

  testMatch: ['<rootDir>/src/**/*.test.{js,jsx}'],

  testEnvironment: 'jest-environment-jsdom-fourteen',

  transform: {
    '^.+\\.(js|jsx)$'             : '<rootDir>/node_modules/babel-jest',
    '^.+\\.css$'                  : '<rootDir>/config/jest/cssTransform.js',
    '^(?!.*\\.(js|jsx|css|json)$)': '<rootDir>/config/jest/fileTransform.js'
  },

  transformIgnorePatterns: [
    '[/\\\\]node_modules.+\\.(js|jsx)$',
    '^.+\\.module\\.(css|sass|scss)$'
  ],

  modulePaths: ['<rootDir>/src/'],

  moduleNameMapper    : {
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy'
  },
  moduleFileExtensions: [
    'js',
    'json',
    'jsx'
  ],

  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname'
  ],

  automock: false,

  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/**/index.js',
    '!src/**/*.stub.{js,jsx}'
  ],

  coverageThreshold: {
    global: {
      branches  : 35,
      functions : 30,
      lines     : 35,
      statements: 35
    }
  }
};
