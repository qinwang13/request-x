const webpack = require('webpack');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BabiliPlugin = require('babili-webpack-plugin');
const base = require('./webpack.base.conf');
const { IS_DEV } = require('./utils');

const targets = module.exports = [];

targets.push(Object.assign({}, base, {
  entry: {
    popup: 'src/popup/index.js',
    blocker: 'src/blocker.js',
  },
  plugins: [
    ... base.plugins,
    new HtmlWebpackPlugin({
      filename: 'popup.html',
      template: 'src/popup/index.html',
      inject: true,
      chunks: ['popup'],
      chunksSortMode: 'dependency'
    }),
    // new FriendlyErrorsPlugin(),
    ... IS_DEV ? [
    ] : [
      // extract css into its own file
      new ExtractTextPlugin('[name].css'),
      new BabiliPlugin({
        builtIns: false,
      }),
    ],
  ],
}));