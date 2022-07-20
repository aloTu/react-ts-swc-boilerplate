/* eslint-disable */

const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackBar = require('webpackbar');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const CONTEXT = resolve(__dirname, '../../src/');
console.log(__dirname, CONTEXT);

module.exports = {
  resolve: {
    extensions: ['.mjs', '.ts', '.tsx', '.js', '.jsx'],
    alias: {
      '@': CONTEXT,
    },
  },
  context: CONTEXT,
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/i,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        // 上一行表示只在jsx 和tsx 中使用
        use: ['@svgr/webpack'],
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: ['swc-loader'],
      },
    ],
  },
  plugins: [
    new WebpackBar(),
    new HtmlWebpackPlugin({
      template: '../public/index.html',
    }),
    new ForkTsCheckerWebpackPlugin({typescript: {configFile: '../tsconfig.json'}}),
  ],
  performance: {
    hints: false,
  },
};
