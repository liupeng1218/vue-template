const path = require('path')

const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isDev = process.env.NODE_ENV === 'development'
module.exports = {
  entry: './src/main.js', // 入口文件
  output: {
    path: path.resolve(__dirname, 'dist'), //打包后的目录，必须是绝对路径
    filename: 'js/[name].[hash:6].js', // 入口文件打包后的文件名称
    chunkFilename: 'js/[name].[hash:8].js', // 块打包后的文件名称
    publicPath: '/' //通常是CDN地址
  },
  module: {
    // 从右向左解析
    rules: [
      {
        test: /\.jsx?$/,
        use: ['cache-loader', 'babel-loader'],
        include: [path.resolve(__dirname, 'src')]
      },
      // vue文件解析
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              compilerOptions: {
                // 清除模板html标签之间的空格
                preserveWhitespace: false
              }
            }
          }
        ]
      },
      {
        test: /\.(le|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev,
              reloadAll: true
            }
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [require('autoprefixer')()]
              }
            }
          },
          'less-loader'
        ],
        include: [path.resolve(__dirname, 'src')]
      },
      {
        test: /\.(png|jpg|gif|jpeg|webp|svg|eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240, //10K
              esModule: false,
              name: '[name]_[hash:6].[ext]'
            }
          }
        ],
        include: [path.resolve(__dirname, 'src')]
      }
    ]
  },
  resolve: {
    // 别名方便引入
    alias: {
      ' @': path.resolve(__dirname, '../src')
    },
    // 自定义解析后缀，引入时不需要写文件后缀
    extensions: ['.js', '.json', '.vue']
  },
  plugins: [
    new HardSourceWebpackPlugin(), // 提高构建速度
    new VueLoaderPlugin(), // 处理 vue文件
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html', //打包后的文件名
      minify: {
        removeAttributeQuotes: false, //是否删除属性的双引号
        collapseWhitespace: false //是否折叠空白
      }
    })
  ]
}
