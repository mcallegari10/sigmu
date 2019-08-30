module.exports = {
  extends: ['wolox-react'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: { legacyDecorators: true }
  },
  rules: {
    'react/jsx-filename-extension': ['error', { extensions: ['.js'] }],
    'import/no-named-as-default': 0,
    'import/no-named-as-default-member': 0,
    'curly': ['error', 'multi'],
    'react/jsx-no-bind': 'off',
    'react/forbid-dom-props': 0,
    'camelcase': ["error", { allow: ["^.*_plural$"] }],
    'import/order': [
      'error', {
        'newlines-between': 'always',
        groups: ['builtin', 'external', ['unknown', 'internal'], 'parent', 'sibling', 'index']
      }
    ]
  },
  settings: {
    'import/resolver': {
      'babel-module': {
        alias: {
          '@components': './src/app/components',
          '@screens': './src/app/screens',
          '@config': './src/config',
          '@constants': './src/constants',
          '@context': './src/context',
          '@services': './src/services',
          '@utils': './src/utils',
          '@propTypes': './src/propTypes',
          '@queries': './src/queries',
          '@assets': './src/assets'
        }
      },
    },
    react: {
      version: '16.9.0'
    }
  }
};
