//webpack.config.production.js
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.config.base.js')
const webpack = require('webpack')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = merge(baseWebpackConfig, {
  mode: 'production',
  devtool: 'none',
  optimization: {
    splitChunks: {
      //分割代码块
      cacheGroups: {
        vendor: {
          //第三方依赖
          priority: 1, //设置优先级，首先抽离第三方模块
          name: 'vendor',
          test: /node_modules/,
          chunks: 'initial',
          minSize: 0,
          minChunks: 1, //最少引入了1次
        },
        //缓存组
        common: {
          //公共模块
          chunks: 'initial',
          name: 'common',
          minSize: 100, //大小超过100个字节
          minChunks: 3, //最少引入了3次
        },
      },
    },
    runtimeChunk: {
      name: 'manifest',
    },
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*', '!dll', '!dll/**'], //不删除dll目录下的文件
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../public'),
        to: path.resolve(__dirname, 'dist', 'public'),
      },
      //还可以继续配置其它要拷贝的文件
    ]),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash:6].css',
    }),
    new OptimizeCssPlugin(),
    new webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname, 'dist', 'dll', 'manifest.json'),
    }),
  ],
})
