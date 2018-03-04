const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = merge(baseWebpackConfig, {
  output: {
    publicPath: './dist',
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true
    }),
  ],
})

module.exports = [
  merge(config, {
    entry: {
      'siiimple-toast.min': './src/main.js',
    },
    output: {
      libraryTarget: 'window',
      library: 'siiimpleToast',
      libraryExport: 'default',
    },
  }),
  merge(config, {
    plugins: [
      new HtmlWebpackPlugin({
        filename: '../index.html',
        template: 'www/index.html',
      }),
    ],
  }),
];
