"use strict";
const path = require("path");
const utils = require("./utils");
const config = require("../config");
const vueLoaderConfig = require("vue-loader/lib/plugin");
const { VueLoaderPlugin } = require('vue-loader');
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const webpack = require('webpack')


function resolve(dir) {
  return path.join(__dirname, "..", dir);
}

let entry = {},
  output = {};
if (process.env.OPT_TYPE == "dll") {
  //dll打包
  entry = {
    libs: config.dll.entry
  };
  output = {
    path: config.dll.output,
    filename: config.dll.filename,
    publicPath: config.dll.publicPath,
    library: "[name]"
  };
} else {
  entry = {
    app: ["babel-polyfill", "./src/main.js"]
  };
  output = {
    path:
      process.env.NODE_ENV === "production"
        ? config.build.assetsRoot
        : config.dev.assetsRoot,
    filename: "[name].js",
    publicPath:
      process.env.NODE_ENV === "production"
        ? config.build.assetsPublicPath
        : config.dev.assetsPublicPath
  };
}
module.exports = {
  context: path.resolve(__dirname, "../"),
  entry,
  output,
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
  resolve: {
    symlinks: false,
    cacheWithContext: false,
    //绝对路径, 查找module的话从这里开始查找(可选)
    modules: [resolve("src"), "node_modules"],
    extensions: [".js", ".vue", ".jsx", ".json", ".less", ".css"],
    alias: {
      vue$: "vue/dist/vue.esm.js",
      "@": resolve("src"),
      'COM': resolve('src/views/components'),
    },
    fallback: {
      "crypto": require.resolve("crypto-browserify"),
      "stream": require.resolve("stream-browserify"),
      "querystring": require.resolve("querystring-es3"),
      "url": false,
      "fs": false,
      "path": require.resolve("path-browserify"),
      "os": false,
      "vm": require.resolve("vm-browserify"),  // 添加这一行
      "http": require.resolve("stream-http"),
      "events": require.resolve("events")
    },
  },
  optimization: {
    splitChunks: {
      name: "common"
    }
  },
  externals: {
    'libs': 'libs', // 或者 'libs' 对应的全局变量名
    sourceType: 'var' // 明确指定全局变量模式
  },
  plugins: [new VueLoaderPlugin(), new ProgressBarPlugin(),
  new webpack.ProvidePlugin({ process: 'process/browser', Buffer: ['buffer', 'Buffer'], libs: 'libs',EventEmitter: ['events', 'EventEmitter'] })],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        resolve: {
          fullySpecified: false // 解决 canvg 的严格模块问题
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            css: ['vue-style-loader', 'css-loader'],
            scss: ['vue-style-loader', 'css-loader', 'sass-loader']
          },
          transformToRequire: {
            video: ['src', 'poster'],
            source: 'src',
            img: 'src',
            image: 'xlink:href'
          }
        }
      },
      {
        test: /\.jsx?$/,
        use: ["thread-loader", "babel-loader"],
        include: [resolve("src"), resolve("test")]
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        include: [
          resolve("src"),
          resolve("test"),
          resolve("vendor"),
          resolve("node_modules/sha1"),
          resolve("node_modules/webpack-dev-server/client"),
          resolve("node_modules/v-charts/src"),
          resolve("node_modules/vue-awesome"),
          resolve("node_modules/element-ui/packages"),
          resolve("node_modules/element-ui/src"),
          resolve("node_modules/element-ui"),
          resolve("node_modules/pte-ui"),
          resolve("node_modules/sha2"),
        ]
      },
      {
        test: /\.svg$/,
        loader: "svg-sprite-loader",
        include: [resolve("src/icons")],
        options: {
          symbolId: "icon-[name]"
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)(\?.*)?$/,
        type: 'asset/resource', // 替代 file-loader
        generator: {
          // 保持与 Webpack 4 相同的命名格式
          filename: 'img/[name].[hash:8].[ext][query]'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name].[hash:8][ext][query]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name].[hash:8][ext][query]'
        }
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    // setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    // dgram: "empty",
    // fs: "empty",
    // net: "empty",
    // tls: "empty",
    // child_process: "empty"
  }
};
