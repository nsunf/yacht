import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import path from 'path';
const __dirname = path.resolve();

export default {
  mode: "development",
  entry: {
    index: path.resolve(__dirname, 'src', 'index.ts')
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['ts-loader']
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-modules-typescript-loader', 'css-loader']
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: ['file-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html'),
      filename: 'index.html',
      chunks: 'index'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].style.css'
    })
  ],
  resolve: {
    extensions: ['.js', '.ts', '.css']
  },
  devServer: {
    port: 3000
  },
  watch: true
}