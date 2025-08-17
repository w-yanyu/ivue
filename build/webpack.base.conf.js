'use strict'

const path = require('path')
const utils = require('./utils')
const config = require('../config')
const webpack = require('webpack')
const vueLoaderConfig = require('./vue-loader.conf')
const { VueLoaderPlugin } = require('vue-loader') // vue-loader 15+ 需这样导入
const ProgressBarPlugin = require('progress-bar-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

let entry = {}, output = {};
if (process.env.OPT_TYPE === 'dll') {
  entry = { libs: config.dll.entry }
  output = {
    path: config.dll.output,
    filename: config.dll.filename,
    publicPath: config.dll.publicPath,
    library: '[name]'
  }
} else {
  entry = { app: ['./src/main.js'] } // babel-polyfill 改为 core-js/runtime 在 main.js 引入
  output = {
    path: process.env.NODE_ENV === 'production' ? config.build.assetsRoot : config.dev.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath
  }
}

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry,
  output,
  resolve: {
    modules: [resolve('src'), 'node_modules'],
    extensions: ['.js', '.vue', '.jsx', '.json', '.less', '.css'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'COM': resolve('src/views/components'),
      'process/browser': require.resolve('process/browser.js')
    },
    fallback: {
      fs: false, // 浏览器里不能用 fs
      canvas: false,
      vm: require.resolve('vm-browserify'),  // 新增
      crypto: require.resolve('crypto-browserify'),
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
      os: require.resolve('os-browserify/browser'),
      path: require.resolve('path-browserify'),
      stream: require.resolve("stream-browserify"),
      process: require.resolve("process/browser"),
      zlib: require.resolve("browserify-zlib"),
      buffer: require.resolve("buffer/"),
      util: require.resolve("util/"),
    }
  },
  optimization: {
    splitChunks: { name: 'all' }
  },
  plugins: [
    new VueLoaderPlugin(),
    new ProgressBarPlugin(),
    new webpack.DefinePlugin({
      'process.env.VUE_APP_MK_LINK_URL': JSON.stringify(process.env.VUE_APP_MK_LINK_URL),
    }),
    // 补充 process/Buffer 的 polyfill
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    })
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          'thread-loader',
          { loader: 'vue-loader', options: vueLoaderConfig }
        ]
      },
      {
        test: /\.jsx?$/,
        use: [
          'thread-loader',
          'babel-loader'
        ],
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: [['@babel/preset-env', { modules: false, useBuiltIns: 'entry', corejs: 3 }]],
          plugins: [
            '@babel/plugin-transform-runtime',
            '@babel/plugin-proposal-class-properties',
            '@babel/plugin-proposal-object-rest-spread'
          ]
        },
        include: [
          resolve('src'),
          resolve('test'),
          resolve('vendor'),
          resolve('node_modules/sha1'),
          resolve('node_modules/webpack-dev-server/client'),
          resolve('node_modules/v-charts/src'),
          resolve('node_modules/vue-awesome'),
          resolve('node_modules/element-ui/packages'),
          resolve('node_modules/element-ui/src'),
          resolve('node_modules/pte-ui'),
          resolve('node_modules/sha2'),
          resolve('node_modules/v-contextmenu'),
          resolve('node_modules/asn1.js')
        ]
      },
      {
        test: /\.mjs$/,
        loader: 'babel-loader',
        include: [resolve('node_modules/vue-runtime-helpers/dist/index.mjs')]
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        include: [resolve('src/icons')],
        options: { symbolId: 'icon-[name]' }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        exclude: [resolve('src/icons')],
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  node: false
}
