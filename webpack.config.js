const path = require('path'); // config file에서는 ESM 문법을 사용할 수 없으므로 require로 불러온다.

module.exports = {
  entry: './src/index.js', // webpack will start bundling from this file
  output: {
    filename: 'bundle.js', // the bundled file will be named bundle.js
    path: path.resolve(__dirname, './dist'), // the bundled file will be placed in the dist folder
  },
  mode: 'none', // this is the default mode, you can also set it to 'development' or 'production'
  module: {
    rules: [
      {
        test: /\.(ttf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
};
