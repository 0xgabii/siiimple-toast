const rimraf = require('rimraf');
const webpack = require('webpack');
const webpackConfig = require('./webpack.prod.conf');

rimraf(path.join(__dirname, '..', 'dist'), error => {
  if (error) throw error;
  webpack(webpackConfig, (webpackError, stats) => {
    if (webpackError) throw webpackError;

    console.log('Build complete');
  });
});
