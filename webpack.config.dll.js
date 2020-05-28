//webpack.config.dll.js
const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: {
    build: ['vue'],
  },
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist', 'dll'),// 打包后文件输出的位置
    filename: '[name].dll.[hash:6].js',
    library: '[name]_dll', //暴露给外部使用，需要和webpack.DllPlugin中的`name: '[name]_library',`保持一致。
    //libraryTarget 指定如何暴露内容，缺省时就是 var
  },
  plugins: [
    new webpack.DllPlugin({
      //name和library一致
      path: path.resolve(__dirname, 'dist', 'dll', 'manifest.json'), //manifest.json的生成路径
      name: '[name]_dll',
    }),
  ],
}
