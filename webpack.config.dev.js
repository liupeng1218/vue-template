//webpack.config.dev.js
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.config.base.js')
const webpack = require('webpack')

module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map', //开发环境下使用
  devServer: {
    port: '8080', //默认是8080
    open: true,
    quiet: false, //默认不启用
    inline: true, //默认开启 inline 模式，如果设置为false,开启 iframe 模式
    stats: 'errors-only', //终端仅打印 error
    overlay: false, //默认不启用
    clientLogLevel: 'silent', //日志等级
    compress: true, //是否启用 gzip 压缩
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), //热更新插件

  ]
})
