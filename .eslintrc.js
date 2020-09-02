module.exports = {
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:sonarjs/recommended',
    'airbnb-typescript',
    'prettier',
    'prettier/@typescript-eslint',
  ],
  plugins: ['sonarjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'react/jsx-props-no-spreading': 0,
    'import/order': 0,
    'import/prefer-default-export': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    'no-param-reassign': 0,
    'react/jsx-one-expression-per-line': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    'sonarjs/cognitive-complexity': 0,
    'consistent-return': 0,
    'react/prop-types': 0,
    'sonarjs/no-duplicate-string': 0,
  },
};
