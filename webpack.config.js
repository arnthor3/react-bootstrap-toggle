const path =  require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'eval-source-map',
  entry: './example.jsx',
  output: {
    path: __dirname,
    filename: './index.js',
  },
  devServer: {
    inline:true,
    port: 8008
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  module: {
    preLoaders: [{
      test: /\.jsx?$/,
      loaders: ['eslint'],
      exclude: '/node_modules/',
    }],
    loaders: [{
      test: /.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
    }],
  },
};
