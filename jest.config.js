module.exports = {
  'roots': [
    '<rootDir>',
  ],
  'moduleDirectories': ["node_modules", "src"],
  // 'transform': { '^.+\\.ts?$': 'ts-jest' },
  'moduleFileExtensions': [
    'js',
    'jsx',
    'ts',
    'json',
  ],
  'coveragePathIgnorePatterns': [
    '/node_modules/',
  ],
  'testPathIgnorePatterns': [
    '/node_modules/',
    'components',
  ],
  'collectCoverageFrom': [
    'src/**/*.{js,jsx,ts}',
    '!**/node_modules/**',
    '!**/vendor/**',
    '!**/components/**',
  ],
  'coverageDirectory': './coverage/',
};