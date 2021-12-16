/* eslint-disable */
const { resolve } = require("path");

const { merge } = require("webpack-merge");
const commonConfig = require("./");

module.exports = merge(commonConfig, {
  mode: "development",
  entry: "./index.tsx",
  devServer: {
    static: {
      directory: resolve(__dirname, "public"),
    },
    compress: true,
    port: 3000,
  },
  output: {
    publicPath: "/",
  },
  devtool: "eval-source-map",
});
