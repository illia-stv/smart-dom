module.exports = {
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:@typescript-eslint/stylistic'],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    root: true,
    rules: {
        '@typescript-eslint/prefer-for-of': 'off',
        '@typescript-eslint/array-type': 'off',
        '@typescript-eslint/consistent-indexed-object-style': 'off'
    },
    "ignorePatterns": ["dist/"]
  };
