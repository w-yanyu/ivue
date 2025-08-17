'use strict'
const path = require('path')
const { merge } = require('webpack-merge')
const webpack = require('webpack')
const baseWebpackConfig = require('./webpack.base.conf')
const utils = require('./utils')
const config = require('../config')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin')
const FriendlyErrorsPlugin = require('@soda/friendly-errors-webpack-plugin');
const portfinder = require('portfinder')
const address = require('address')

const HOST = process.env.HOST || config.dev.host
const PORT = process.env.PORT || config.dev.port
const manifest = path.resolve(config.dll.output, 'manifest.json')

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  devtool: config.dev.devtool,
  devServer: {
    client: { logging: 'none' },
    historyApiFallback: true,
    hot: false,
    compress: true,
    host: HOST,
    port: PORT,
    open: config.dev.autoOpenBrowser,
    static: { directory: path.resolve(__dirname, '../public') },
    proxy: config.dev.proxyTable,
    watchFiles: ['src/**/*']
  },
  plugins: [
    new webpack.DllReferencePlugin({ manifest, name: 'libs' }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'public/index.html',
      inject: true,
      hash: true,
      favicon: path.resolve(__dirname, '../public/favicon.ico'),
      path: config.dev.assetsPublicPath + config.dev.assetsSubDirectory
    }),
    new HtmlWebpackIncludeAssetsPlugin({ assets: ['./js/libs.js'], append: false, hash: true }),
    new FriendlyErrorsPlugin()
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = PORT
  portfinder.getPort((err, port) => {
    if (err) reject(err)
    else {
      devWebpackConfig.devServer.port = port
      process.env.PORT = port
      devWebpackConfig.plugins.push(
        new FriendlyErrorsPlugin({
          compilationSuccessInfo: {
            messages: [
              `App running at:`,
              `- Local:    http://localhost:${port}`,
              `- Network:  http://${address.ip()}:${port}`
            ]
          },
          clearConsole: true
        })
      )
      resolve(devWebpackConfig)
    }
  })
})
