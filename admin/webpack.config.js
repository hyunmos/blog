const Webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const ADMIN_ROOT_PATH = path.resolve(__dirname);
const ADMIN_SRC_PATH = path.resolve(__dirname, 'src');
const ADMIN_DIST_PATH = path.resolve(ADMIN_ROOT_PATH, 'dist');

const IS_PROD = process.env.NODE_ENV === 'production';

module.exports = {
  entry: path.join(ADMIN_SRC_PATH, 'index.js'),
  devtool: 'cheap-module-eval-source-map',
  output: {
    filename: IS_PROD ? '[name].[contenthash:8].js' : '[name].js',
    path: ADMIN_DIST_PATH,
    publicPath: '/',
  },
  mode: process.env.NODE_ENV,
  devServer: {
    contentBase: ADMIN_DIST_PATH,
    compress: true,
    port: 9000,
    host: '0.0.0.0',
    historyApiFallback: true,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_moduels/,
        include: ADMIN_SRC_PATH,
        use: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.s?css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|woff|woff2|ttf|eot|cur)$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(ADMIN_ROOT_PATH, 'index.html'),
      inject: 'body',
    }),
    new Webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new CompressionPlugin({
      test: [/\.jsx?$/i, /\.png$/i],
    }),
  ],
  resolve: {
    alias: {
      '@': ADMIN_SRC_PATH,
    },
    extensions: ['.js', '.jsx'],
  },
};
