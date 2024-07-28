const path = require('path'); // config file에서는 ESM 문법을 사용할 수 없으므로 require로 불러온다.
const TerserPlugin = require('terser-webpack-plugin'); // terser-webpack-plugin을 사용하여 코드를 압축
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // mini-css-extract-plugin을 사용하여 CSS 파일을 추출
// const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // clean-webpack-plugin을 사용하여 빌드 이전 파일을 삭제
const HtmlWebpackPlugin = require('html-webpack-plugin'); // html-webpack-plugin을 사용하여 HTML 파일을 생성

module.exports = {
  entry: './src/index.js', // webpack will start bundling from this file
  output: {
    filename: 'bundle.[contenthash].js', // the bundled file will be named bundle.js
    path: path.resolve(__dirname, './dist'), // the bundled file will be placed in the dist folder
    publicPath: '', // the path to the bundled file will be dist/bundle
    clean: true, // clean the dist folder before each build
  },
  mode: 'none', // this is the default mode, you can also set it to 'development' or 'production'
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        type: 'asset',
      },
      {
        test: /\.txt/,
        type: 'asset/source',
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env'], // env preset을 사용하여 ES6+ 코드를 ES5로 변환
            plugins: ['@babel/plugin-proposal-class-properties'], // class properties plugin을 사용하여 class properties를 변환
          },
        },
      },
    ],
  },
  plugins: [
    new TerserPlugin(), // TerserPlugin을 사용하여 코드를 압축
    new MiniCssExtractPlugin({
      filename: 'styles.[contenthash].css',
    }), // MiniCssExtractPlugin을 사용하여 CSS 파일을 추출
    // new CleanWebpackPlugin(),
    new HtmlWebpackPlugin(),
  ],
};
