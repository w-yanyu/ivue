"use strict";
const path = require("path");
const utils = require("./utils");
const webpack = require("webpack");
const config = require("../config");
const { merge } = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.conf");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin')
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, "..", dir);
}

const env = require("../config/prod.env");
const manifest = path.resolve(config.dll.output, "manifest.json");

const webpackConfig = merge(baseWebpackConfig, {
  mode: "production",
  devtool: 'source-map', // 生成 Source Map
  // 启用文件缓存（Webpack 5+）
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename]
    }
  },
  // 禁用性能提示
  performance: {
    hints: false
  },

  externals: {
    'libs': 'libs', // 或者 'libs' 对应的全局变量名
    sourceType: 'var' // 明确指定全局变量模式
  },
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
    publicPath: config.build.assetsPublicPath,
    filename: utils.assetsPath("js/[name].[chunkhash].js"),
    chunkFilename: utils.assetsPath("js/[id].[chunkhash].js")
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
          common: {
            name: `chunk-common`,
            minChunks: 2,
            priority: -20,
            chunks: 'initial',
            reuseExistingChunk: true,//如果当前要提取的模块，在已经在打包生成的js文件中存在，则将重用该模块，而不是把当前要提取的模块打包生成新的 js 文件
          }
        }
      },
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": env
    }),
    new webpack.DllReferencePlugin({
      manifest,
      name: "libs"
    }),
    new webpack.ProvidePlugin({
      libs: 'libs' // 将全局 libs 变量注入所有模块
    }),
    // extract css into its own file
    new MiniCssExtractPlugin({
      filename: utils.assetsPath("css/[name].css")
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    // new OptimizeCSSPlugin({
    //   cssProcessorOptions: config.build.productionSourceMap
    //     ? { safe: true, map: { inline: false } }
    //     : { safe: true }
    // }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackTagsPlugin({
      tags: ["js/libs.js"],
      append: false,
      hash: true,
      publicPath: false // 使用绝对路径
    }),
    new HtmlWebpackPlugin({
      filename: config.build.index,
      template: "public/index.html",
      inject: true,
      hash: true,
      favicon: resolve("public/favicon.ico"),
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
      // chunksSortMode: "none",
      chunks: ['libs', 'app'], // 确保包含你的libs chunk
      chunksSortMode: 'manual'
    }),
    new HtmlWebpackIncludeAssetsPlugin({
      assets: ['js/libs.js'],
      append: false,
      hash: true
    }),

    // copy custom public assets
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "../public"),
          to: config.build.assetsSubDirectory
        },
        {
          from: config.dll.output,
          to: path.resolve(config.build.assetsRoot)
        }
      ]
    })
  ]
});

if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require("compression-webpack-plugin");

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      filename: "[path].gz[query]",
      algorithm: "gzip",
      test: new RegExp(
        "\\.(" + config.build.productionGzipExtensions.join("|") + ")$"
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  );
}
if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
    .BundleAnalyzerPlugin;
  webpackConfig.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = webpackConfig;
