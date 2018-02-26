const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');
const compiler = webpack(require('./webpack.dev.conf.js'));
const express = require('express');
const app = express();

const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: '/',
  quiet: true
});

const hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: false,
  heartbeat: 2000
});

// serve webpack bundle output
app.use(devMiddleware);

// enable hot-reload and state-preserving
app.use(hotMiddleware);

// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

app.listen(7777, () => console.log('Listening on port 7777'))
