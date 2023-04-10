const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',

  output: {
    clean: true,
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    assetModuleFilename: 'assets/[name].[contenthash][ext]',
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.twig',
    }),
    new ESLintPlugin({
      extensions: ['.js'],
      exclude: 'node_modules',
      context: 'src',
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: path.resolve(__dirname, 'src/favicon.ico'), to: path.resolve(__dirname, 'dist') },
        { from: path.resolve(__dirname, 'src/static'), to: path.resolve(__dirname, 'dist/static') },
      ],
    }),
  ],

  module: {
    rules: [
      {
        test: /\.scss|css$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },

      {
        test: /\.js/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },

      {
        test: /\.(png|svg|jpg|gif)$/,
        type: 'asset/resource',
      },

      {
        test: /\.twig$/,
        exclude: /node_modules/,
        use: ['twigjs-loader'],
      },

      {
        test: /\.html$/,
        use: ['html-loader'],
      },
    ],
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    extensions: ['.twig', '.js'],
    fallback: { path: false },
  },

  optimization: {
    usedExports: true,
    minimizer: [
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [
              ['jpegtran', { progressive: true }],
              ['optipng', { optimizationLevel: 5 }],
            ],
          },
        },
      }),
      '...',
    ],
  },
};
