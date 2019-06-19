const path =  require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    //环境
    mode:'development',
    //打包的入口
    entry:'./src/app.js',
    //打包的出口配置
    output:{
        filename:'app.js',
        path:path.resolve(__dirname,'./dev')
    },
    //配置webserver,webpack自带,不需要另外下载
    devServer: {
        contentBase:path.join(__dirname,'./dev'),
        compress:true,
        port:9000
    },

    //配置loader,loader让webpack能够去处理那些非javaScript文件，常被用于转换某些类型的模块
    module: {
        rules: [
          {
            test: /\.(png|jpg|gif)$/,
            use: [
              {
                loader: 'url-loader',
                options: {
                  limit: 8192
                }
              }
            ]
          },
          {
            test:/\.html$/i,
            use:[{
              loader:'string-loader'
            }]
          },
          {
            test:/\.hbs$/i,
            use:[{
              loader:'handlebars-loader'
            }]
          }
        ]
      },
    //配置插件,自动关联入口文件。插件的范围包括 从打包优化和压缩，一直到重新定义环境中的变量
    plugins:[
      new HtmlWebpackPlugin({
        filename:'index.html',//目录文件名
        template:'./index.html'  //源文件路径
    }),
    new CopyWebpackPlugin([{ from: './src/public', to: './public' }])
  ]
}