'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

const env = require('../config/prod.env')
const manifest = path.resolve(config.dll.output, 'manifest.json')

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
      usePostCSS: true
    })
  },
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  optimization: {
    //分包配置
    splitChunks: {
        chunks: 'all',//只提取异步加载的模块出来打包到一个文件中
        minSize: 30000,//把提取出来的模块打包生成的文件大小不能超过maxSize值
        maxSize: 0,//规定被提取的模块在压缩前的大小最小值，单位为字节
        minChunks: 1,//表示要被提取的模块最小被引用次数，引用次数超过或等于minChunks值，才能被提取
        maxAsyncRequests: 5,//选项：最大的按需(异步)加载次数，默认为 6；
        maxInitialRequests: 4,//打包后的入口文件加载时，还能同时加载js文件的数量（包括入口文件），默认为4
        automaticNameDelimiter: '~',//打包生成的js文件名的分割符，默认为：~
        cacheGroups: {
          // vendors: {
          //   name: `chunk-vendors`,
          //   test: /[\\/]node_modules[\\/]/,//用来匹配要提取的模块的资源路径或名称，值是正则或函数；
          //   priority: -20,//方案的优先级，值越大表示提取模块时优先采用此方案，默认值为0；
          //   chunks: 'all',
          //   maxInitialRequests: 3, // 最大初始化请求书，默认1
          //   reuseExistingChunk: true,//如果当前要提取的模块，在已经在打包生成的js文件中存在，则将重用该模块，而不是把当前要提取的模块打包生成新的 js 文件
          // },
          pteui: {
              name: `pte-ui`,
              test: /[\\/]node_modules[\\/]pte-ui[\\/]/,
              chunks: 'all',
              minSize: 30000,
              minChunks: 1,
              enforce: true,
              maxAsyncRequests: 5, // 最大异步请求数， 默认1
              maxInitialRequests: 3, // 最大初始化请求书，默认1
              priority: 5, // 优先级
              reuseExistingChunk: true
          },
          echarts: {
            name: `echarts`,
            test: /[\\/]node_modules[\\/]echarts[\\/]/,
            chunks: 'all',
            minSize: 30000,
            minChunks: 1,
            enforce: true,
            maxAsyncRequests: 5, // 最大异步请求数， 默认1
            maxInitialRequests: 3, // 最大初始化请求书，默认1
            priority: 0, // 优先级
            reuseExistingChunk: true
          },
          bpmnjs: {
            name: `bpmn-js`,
            test:/[\\/]node_modules[\\/]bpmn-js[\\/]/,
            chunks: 'all',
            minSize: 30000,
            minChunks: 1,
            enforce: true,
            maxAsyncRequests: 5, // 最大异步请求数， 默认1
            maxInitialRequests: 3, // 最大初始化请求书，默认1
            priority: 0, // 优先级
            reuseExistingChunk: true
          },
          xlsxjs: {
            name: `xlsx-js`,
            test: /[\\/]node_modules[\\/]xlsx[\\/]/,
            chunks: 'all',
            minSize: 30000,
            minChunks: 1,
            enforce: true,
            maxAsyncRequests: 5, // 最大异步请求数， 默认1
            maxInitialRequests: 3, // 最大初始化请求书，默认1
            priority: 0, // 优先级
            reuseExistingChunk: true
          },
          gojs: {
            name: `go-js`,
            test: /[\\/]node_modules[\\/]gojs[\\/]/,
            chunks: 'all',
            minSize: 30000,
            minChunks: 1,
            enforce: true,
            maxAsyncRequests: 5, // 最大异步请求数， 默认1
            maxInitialRequests: 3, // 最大初始化请求书，默认1
            priority: 0, // 优先级
            reuseExistingChunk: true
          },
          antv: {
            name: `antv`,
            test:/[\\/]node_modules[\\/]@antv[\\/]/, 
            chunks: 'all',
            minSize: 30000,
            minChunks: 1,
            enforce: true,
            maxAsyncRequests: 5, // 最大异步请求数， 默认1
            maxInitialRequests: 3, // 最大初始化请求书，默认1
            priority: 0, // 优先级
            reuseExistingChunk: true
          },
        
          jspdf: {
            name: `jspdf`,
            test: /[\\/]node_modules[\\/]jspdf[\\/]/, 
            chunks: 'all',
            minSize: 30000,
            minChunks: 1,
            enforce: true,
            maxAsyncRequests: 5, // 最大异步请求数， 默认1
            maxInitialRequests: 3, // 最大初始化请求书，默认1
            priority: 0, // 优先级
            reuseExistingChunk: true

          },
          viewPl: {
            name: `view-pl`,
            test: /[\\/]src[\\/]pl|risk|icms|pd|other[\\/]/,
            chunks: 'all',
            minSize: 30000,
            minChunks: 1,
            enforce: true,
            maxAsyncRequests: 5, // 最大异步请求数， 默认1
            maxInitialRequests: 3, // 最大初始化请求书，默认1
            priority: 3, // 优先级
            reuseExistingChunk: true
          },
          // viewRisk: {
          //   name: `view-risk`,
          //   test:/[\\/]src[\\/]views[\\/]risk[\\/]/,
          //   chunks: 'all',
          //   minSize: 30000,
          //   minChunks: 1,
          //   enforce: true,
          //   maxAsyncRequests: 5, // 最大异步请求数， 默认1
          //   maxInitialRequests: 3, // 最大初始化请求书，默认1
          //   priority: 2, // 优先级
          //   reuseExistingChunk: true
          // },
          // viewIcms: {
          //   name: `view-icms`,
          //   test:/[\\/]src[\\/]views[\\/]icms[\\/]/,
          //   chunks: 'all',
          //   minSize: 30000,
          //   minChunks: 1,
          //   enforce: true,
          //   maxAsyncRequests: 5, // 最大异步请求数， 默认1
          //   maxInitialRequests: 3, // 最大初始化请求书，默认1
          //   priority: 2, // 优先级
          //   reuseExistingChunk: true
          // },
          // viewPd: {
          //   name: `view-pd`,
          //   test:/[\\/]src[\\/]views[\\/]pd[\\/]/,
          //   chunks: 'all',
          //   minSize: 30000,
          //   minChunks: 1,
          //   enforce: true,
          //   maxAsyncRequests: 5, // 最大异步请求数， 默认1
          //   maxInitialRequests: 3, // 最大初始化请求书，默认1
          //   priority: 2, // 优先级
          //   reuseExistingChunk: true
          // },
      
          common: {
            name: `chunk-common`,
            minChunks: 2,
            priority: -20,
            chunks: 'initial',
            reuseExistingChunk: true,//如果当前要提取的模块，在已经在打包生成的js文件中存在，则将重用该模块，而不是把当前要提取的模块打包生成新的 js 文件
          }
        },
    },
},
  plugins: [
    new webpack.DllReferencePlugin({
      manifest,
      name: 'libs'
    }),
    // extract css into its own file
    new MiniCssExtractPlugin({
      filename: utils.assetsPath('css/[name].css'),
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: config.build.productionSourceMap
        ? { safe: true, map: { inline: false } }
        : { safe: true }
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: config.build.index,
      template: 'public/index.html',
      inject: true,
      hash: true,
      favicon: resolve('public/favicon.ico'),
      // title: 'admin-sunline',
      path: config.build.assetsPublicPath + config.build.assetsSubDirectory,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'none'
    }),
    new HtmlWebpackIncludeAssetsPlugin({
      assets: ['js/libs.js'],
      append: false,
      hash: true
    }),
    // copy custom public assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../public'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      },
      {
        from: config.dll.output,
        to: path.resolve(config.build.assetsRoot)
      }
    ]),
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false, //删除无用代码时不输出警告
          drop_console: true, //删除所有console语句，可以兼容IE
          collapse_vars: true, //内嵌已定义但只使用一次的变量
          reduce_vars: true //提取使用多次但没定义的静态值到变量
        },
        output: {
          beautify: false, //最紧凑的输出，不保留空格和制表符
          comments: false //删除所有注释
        }
      }
    })
  ]
})
//Gzip配置
if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')
  // 定义压缩文件类型
  const productionGzipExtensions = ['js', 'css', 'svg', 'ttf', 'otf','png','json','html','jpg']
  // 缓存dll,优化编译速度
  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      filename: "[path][base].gz",
      algorithm: "gzip",
      test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
      threshold: 10240, // 只有大小大于该值的资源会被处理 10240
      minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
      deleteOriginalAssets: false // 删除原文件true=删
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
