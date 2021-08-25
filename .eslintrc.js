module.exports = {
  root: true,
  ignorePatterns: ['e2e'],
  plugins: ['prettier'],
  extends: ['@react-native-community','plugin:prettier/recommended'],
  rules: {
    'prettier/prettier': 'error',
  },
}
