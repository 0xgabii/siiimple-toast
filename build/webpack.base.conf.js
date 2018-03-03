const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
const mainStyle = new ExtractTextPlugin('style.css');
const wwwStyle = new ExtractTextPlugin('www/style.css');

module.exports = {
  entry: {
    main: './src/main.js',
    'www/script': './www/script.js',
  },
  output: {
    path: resolve('dist'),
    filename: '[name].js',
    publicPath: './',
  },
  resolve: {
    extensions: ['.js'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src')],
        options: {
          formatter: require('eslint-friendly-formatter')
        },
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src')],
      },
      {
        test: /\.scss$/,
        include: [resolve('src')],
        use: mainStyle.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        }),
      },
      {
        test: /\.scss$/,
        include: [resolve('www')],
        use: wwwStyle.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        }),
      },
    ]
  },
  plugins: [
    mainStyle,
    wwwStyle,
  ]
};
