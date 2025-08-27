const path = require('path');

module.exports = {
  publicPath: '/',
  configureWebpack: {
    optimization: {
      splitChunks: {
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            chunks: 'initial',
            priority: 10,
            reuseExistingChunk: true,
            enforce: true
          }
        }
      }
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
      fallback: {
        path: require.resolve('path-browserify'),
        fs: false,
        stream: require.resolve('stream-browserify'),
      },
    },
    output: {
      chunkFilename: 'libs.js', // 确保包含[name]
      pathinfo: true // 保留模块路径信息
    }
  },

  chainWebpack: (config) => {
    // 禁用预加载
    config.plugin('preload').tap(() => [{
      rel: 'preload',
      fileBlacklist: [/\.map$/, /hot-update\.js$/]
    }])

    // 禁用预取
    config.plugin('prefetch').tap(() => [{
      rel: 'prefetch',
      fileBlacklist: [/\.map$/, /hot-update\.js$/]
    }])

    // 删除默认的 splitChunks 配置
    config.optimization.delete('splitChunks');

    config.optimization.splitChunks({
      cacheGroups: {
        libs: {
          name: 'libs',
          test: /[\\/]node_modules[\\/]/,
          priority: 20, // 优先级高于默认组
          chunks: 'initial',
          enforce: true
        },
        common: {
          name: 'common',
          minChunks: 2,
          priority: 10,
          chunks: 'initial',
          reuseExistingChunk: true
        }
      }
    });

    // 2. 控制 HTML 中的加载顺序
    config.entry('libs').add('/js/libs.js'); // 替换为你的 libs.js 路径
    config.plugin('html').tap(args => {
      // 方法1: 直接指定 chunks 顺序
      args[0].chunks = ['runtime', 'libs', 'common', 'app']
      return args
    })
  },
};