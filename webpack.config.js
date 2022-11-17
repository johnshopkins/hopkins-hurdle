const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/js/main.js',
  output: {
    clean: true,
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'commonjs2'
  },
  externals: {
    react: 'react',
    'react-dom': 'react-dom',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      }
    ]
  }
};
