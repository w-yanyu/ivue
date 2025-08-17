'use strict'
const path = require('path')
const { merge } = require('webpack-merge')
const webpack = require('webpack')
const baseWebpackConfig = require('./webpack.base.conf')
const utils = require('./utils')
const config = require('../config')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const manifest = path.resolve(config.dll.output, 'manifest.json')

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  module: {
    rules: utils.styleLoaders({ sourceMap: config.build.productionSourceMap, extract: true, usePostCSS: true })
  },
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[contenthash:8].js'),
    chunkFilename: utils.assetsPath('js/[id].[contenthash:8].js')
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({ terserOptions: { compress: { drop_console: true } } }), new OptimizeCSSAssetsPlugin({})],
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      maxAsyncRequests: 5,
      maxInitialRequests: 4,
      automaticNameDelimiter: '~',
      cacheGroups: {
        common: { name: 'chunk-common', minChunks: 2, priority: -20, chunks: 'initial', reuseExistingChunk: true },
        pteui: { name: 'pte-ui', test: /[\\/]node_modules[\\/]pte-ui[\\/]/, chunks: 'all', enforce: true, priority: 5 },
        echarts: { name: 'echarts', test: /[\\/]node_modules[\\/]echarts[\\/]/, chunks: 'all', enforce: true },
        bpmnjs: { name: 'bpmn-js', test: /[\\/]node_modules[\\/]bpmn-js[\\/]/, chunks: 'all', enforce: true },
        gojs: { name: 'go-js', test: /[\\/]node_modules[\\/]gojs[\\/]/, chunks: 'all', enforce: true }
      }
    }
  },
  plugins: [
    new webpack.DllReferencePlugin({ manifest, name: 'libs' }),
    new MiniCssExtractPlugin({ filename: utils.assetsPath('css/[name].[contenthash:8].css') }),
    new HtmlWebpackPlugin({ filename: config.build.index, template: 'public/index.html', inject: true, hash: true, favicon: path.resolve(__dirname, '../public/favicon.ico'), minify: { removeComments: true, collapseWhitespace: true, removeAttributeQuotes: true }, chunksSortMode: 'none' }),
    new HtmlWebpackIncludeAssetsPlugin({ assets: ['js/libs.js'], append: false, hash: true }),
    new CopyWebpackPlugin({ patterns: [{ from: path.resolve(__dirname, '../public'), to: config.build.assetsSubDirectory, globOptions: { ignore: ['.*'] } }, { from: config.dll.output, to: config.build.assetsRoot }] })
  ]
})

module.exports = webpackConfig
