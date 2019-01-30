const VueLoaderPlugin = require('vue-loader/lib/plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');
const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV, // 用于优化，development只编译发生修改的文件
  entry: {
    vendor: './src/vendor.js',
    index: './src/main.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].[hash].min.js',
    chunkFilename: 'js/[name].[hash].min.js',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: ['vue-loader']
      },
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: [
                  require('autoprefixer')()
                ]
              }
            }
          ]
        })
      },
      {
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000
          }
        }]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      title: 'CMS',
      template: './src/index.html',
    }),
    new ExtractTextPlugin({
      filename: 'css/[name].[hash].min.css',
      allChunks: true,
    })
  ],
  resolve: {
    extensions: ['.js', '.vue', '.json', '.css']
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            dead_code: true,
          },
          output: {
            beautify: false,
          },
        },
      }),
    ],
    splitChunks: {
      chunks: 'initial',
      name: 'vendor',
      minChunks: 2,
    }
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  }
}
