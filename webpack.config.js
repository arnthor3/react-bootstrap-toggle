const path =  require('path');
const webpack = require('webpack');

const NODE_ENV = process.env.NODE_ENV || 'development';
const DEV = NODE_ENV !== 'production';

const devE = [
  'react-hot-loader/patch',
  './examples/onClick.jsx',
];

const prodE = {
  main: './src/index.jsx',
  vendors: ['react', 'react-dom'],
};

const minimize = new webpack.optimize.UglifyJsPlugin({
  compress: { screw_ie8: true, warnings: false },
  output: { comments: false },
  sourceMap: false,
});

module.exports = {
  devtool: 'eval-source-map',
  entry: DEV ? devE : prodE,
  output: {
    path: __dirname,
    filename: './dist/index.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      'node_modules',
    ],
  },
  module: {
    rules: [{
      enforce: 'pre',
      test: /\.jsx?$/,
      loaders: 'eslint-loader',
      exclude: '/node_modules/',
    },
    {
      test: /.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
    },
    {
      test: /.css$/,
      loader: 'style-loader!css-loader',
    }],
  },
  plugins: !DEV ? [minimize] : [],
};
