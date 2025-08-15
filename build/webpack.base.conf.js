'use strict'

const path = require('path')
const utils = require('./utils')
const config = require('../config')
const webpack = require('webpack')
const vueLoaderConfig = require('./vue-loader.conf')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

let entry = {}, output = {};
if (process.env.OPT_TYPE == 'dll') {
  //dll打包
  entry = {
    libs: config.dll.entry
  };
  output = {
    path: config.dll.output,
    filename: config.dll.filename,
    publicPath: config.dll.publicPath,
    library: '[name]'
  };
} else {
  entry = {
    app: ['babel-polyfill', './src/main.js']
  };
  output = {
    path: process.env.NODE_ENV === 'production' ? config.build.assetsRoot : config.dev.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  };
}
module.exports = {
  context: path.resolve(__dirname, '../'),
  entry,
  output,
  resolve: {
    //绝对路径, 查找module的话从这里开始查找(可选)
    modules: [resolve('src'), 'node_modules'],
    extensions: ['.js', '.vue', '.jsx', '.json', '.less', '.css'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'COM': resolve('src/views/components'),
    }
  },
  optimization: {
    splitChunks: {
      name: 'common'
    }
  },
  plugins: [
    new VueLoaderPlugin(),
    new ProgressBarPlugin(),
    new webpack.DefinePlugin({
      'process.env.VUE_APP_MK_LINK_URL': JSON.stringify(process.env.VUE_APP_MK_LINK_URL),
    })
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: ['cache-loader', 'thread-loader', {
          loader: 'vue-loader',
          options: vueLoaderConfig
        }]
      },
      {
        test: /\.jsx?$/,
        use: ['cache-loader', 'thread-loader', 'babel-loader'],
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015','env','stage-2']
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
        include: [
          resolve('node_modules/vue-runtime-helpers/dist/index.mjs')          
        ]
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        include: [resolve('src/icons')],
        options: {
          symbolId: 'icon-[name]'
        }
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
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
