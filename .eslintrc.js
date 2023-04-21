module.exports = {
  root: true,
  ignorePatterns: ['e2e'],
  plugins: ['prettier'],
  extends: ['@react-native-community', 'plugin:prettier/recommended'],
  rules: {
    'prettier/prettier': 'error',
    'react-native/no-inline-styles': 'off',
    'react/no-unstable-nested-components': ['off', {allowAsProps: false}],
  },
}
