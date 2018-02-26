module.exports = {
  root: true,
  extends: 'airbnb-base',  
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  'rules': {
    'import/extensions': ['error', 'always', {
      'js': 'never',
    }],
    'no-param-reassign': 0,
    'linebreak-style': 0,
  }
}
