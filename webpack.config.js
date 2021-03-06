const nodeExternals = require("webpack-node-externals");
const NodemonPlugin = require("nodemon-webpack-plugin"); // Ding
const path = require("path");

module.exports = {
  target: "node",
  externals: [nodeExternals()],
  entry: path.join(__dirname, "app.js"),
  output: {
    path: path.join(__dirname, "dist"),
    filename: "app.bundle.js",
    libraryTarget: "commonjs2"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: { loader: "babel-loader" }
      }
    ]
  },
  node: {
    __dirname: false
  },
  plugins: [new NodemonPlugin()]
};
