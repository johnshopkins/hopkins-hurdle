const path = require('path');
const settings = require('./src/settings');

module.exports = {
  mode: 'production',
  entry: {
    main: './src/js/main.js',
    events: './src/js/events.js',
    modal: './src/js/modal.js',
    storage: './src/js/storage.js',
  },
  output: {
    clean: true,
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
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
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              additionalData: (content) => {

                let add = '';

                for (const prop in settings.animations) {
                  add += `$${prop}: ${settings.animations[prop]};`;
                }

                return add + content;

              }
            }
          }
        ],
      }
    ]
  }
};
