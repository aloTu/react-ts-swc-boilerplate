/* eslint-disable */

const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackBar = require("webpackbar");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

const CONTEXT = resolve(__dirname, "../../src/");
console.log(__dirname, CONTEXT);

module.exports = {
  resolve: {
    extensions: [".mjs", ".ts", ".tsx", ".js", ".jsx"],
    alias: {
      "@": CONTEXT,
    },
  },
  context: CONTEXT,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: ["swc-loader"],
      },
    ],
  },
  plugins: [
    new WebpackBar(),
    new HtmlWebpackPlugin({
      template: "../public/index.html",
    }),
    new ForkTsCheckerWebpackPlugin({ typescript: { configFile: "../tsconfig.json" } }),
  ],
  performance: {
    hints: false,
  },
};
