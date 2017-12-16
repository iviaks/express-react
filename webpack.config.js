var webpack = require("webpack");
var fs = require("fs");
var path = require('path');


var nodeModules = {};
fs
  .readdirSync("node_modules")
  .filter(function(x) {
    return [".bin"].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = "commonjs " + mod;
  });

var production = process.env.NODE_ENV === "production";
var publicPath = "/";

var plugins = [];
if (production) {
  plugins.push(
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  );
}

module.exports = {
  entry: "./src/server.js",
  target: "node",
  output: {
    path: __dirname + "/dist/",
    publicPath: publicPath,
    filename: "server.js",
    library: "[name]",
    libraryTarget: "commonjs2"
  },
  externals: nodeModules,
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/],
        include: [path.resolve(__dirname, 'src')],
        loader: "babel-loader"
      }
    ]
  },
  plugins: plugins,
  devtool: "sourcemap",
  node: {
    __dirname: true,
    process: true
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      Scripts: path.resolve(__dirname, "src")
    }
  }
};
