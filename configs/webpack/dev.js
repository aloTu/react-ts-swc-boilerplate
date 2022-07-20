/* eslint-disable */
const {resolve, posix} = require('path');

const {merge} = require('webpack-merge');
const commonConfig = require('./');

module.exports = merge(commonConfig, {
  mode: 'development',
  entry: './index.tsx',
  devServer: {
    static: {
      directory: resolve(__dirname, 'public'),
    },
    compress: true,
    historyApiFallback: true,
    port: 3000,
  },
  output: {
    publicPath: '/',
  },
  devtool: 'eval-source-map',
});
