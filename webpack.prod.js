const { merge } = require("webpack-merge");
const webpack = require("webpack");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "production",
  devtool: "source-map",
  plugins: [
    new webpack.NormalModuleReplacementPlugin(
      /environments\/environment\.ts/,
      "./environment.prod.ts"
    ),
  ],
});
