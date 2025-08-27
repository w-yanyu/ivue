'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const { merge } = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');

const FriendlyErrorsPlugin = require('@soda/friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
const address = require('address')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)
const manifest = path.resolve(config.dll.output, 'manifest.json')

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  devtool: 'source-map', // 生成 Source Map

  externals: {
    'libs': 'libs' // 或者 'libs' 对应的全局变量名
  },
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,
  output: {
    publicPath: config.dev.assetsPublicPath
  },
  // these devServer options should be customized in /config/index.js
  devServer: {

    // clientLogLevel: 'warning',
    historyApiFallback: true,
    hot: false,
    // inline: config.dev.inline,
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    // contentBase: [path.join(__dirname, 'deploy')], // 从 dist/ 提供文件
    // overlay: config.dev.errorOverlay
    //   ? { warnings: false, errors: true }
    //   : false,

    // publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    // quiet: true, // necessary for FriendlyErrorsPlugin
    client: {
      logging: 'error', // 可选值: 'error', 'warn', 'info', 'log', 'verbose', 'none'
      overlay: {
        errors: config.dev.errorOverlay,
        warnings: false,
        runtimeErrors: true
      }
    },
    // watchOptions: {
    //   poll: config.dev.poll,
    // }

    devMiddleware: {
      // watchOptions: {
      //   poll: config.dev.poll,
      // }
    },
    // setupMiddlewares: (middlewares, devServer) => {
    //   // 拦截请求手动提供 DLL
    //   devServer.app.get('/dist/libs.js', (req, res) => {
    //     res.sendFile(path.join(__dirname, 'dist/libs.js'));
    //   });
    //   return middlewares;
    // }
  },
  plugins: [
    new webpack.DllReferencePlugin({
      manifest,
      name: 'libs',
      sourceType: 'var' // 明确指定全局变量模式
    }),
    new webpack.ProvidePlugin({
      libs: 'libs' // 将全局 libs 变量注入所有模块
    }),
    new webpack.HotModuleReplacementPlugin(),
    // new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackTagsPlugin({
      tags: ["js/libs.js"],
      append: false,
      hash: true,
      publicPath: false // 使用绝对路径

    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'public/index.html',
      inject: true,
      hash: true,
      favicon: resolve('public/favicon.ico'),
      path: config.dev.assetsPublicPath + config.dev.assetsSubDirectory,
      chunks: ['libs', 'app'], // 确保包含你的libs chunk
      chunksSortMode: 'manual'
    }),

    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../public'),
          to: config.dev.assetsSubDirectory,
          globOptions: {
            ignore: ['**/index.html']
          }
        },
        {
          from: config.dll.output,
          to: './'
        }
      ]
    })
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [
            `  App running at:`,
            `  - Local:    http://localhost:${port}`,
            `  - Network:  http://${address.ip()}:${port}`
          ]
        },
        onErrors: config.dev.notifyOnErrors
          ? utils.createNotifierCallback()
          : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
