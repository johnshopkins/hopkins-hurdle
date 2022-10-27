const argv = require('minimist')(process.argv.slice(2))
babelify = require('babelify')

module.exports = {

  js: {

    compile: [
      {
        src: ['./src/js/*.js'],
        transform: [
          [babelify, {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react'
            ],
            plugins: [
              'add-module-exports',
              '@babel/plugin-proposal-class-properties'
            ]
          }]
        ]
      }
    ],

    lint: {
      src: ['./src/js/*.js'],
      config: './config/eslintrc.json'
    },

    build: './build/js',
    dist: './dist/js'

  },

  scss: {

    lint: {
      config: './config/scsslint.yml',
      src: [
        './src/css/*.scss'
      ]
    },
    src: [
      './src/css/*.scss'
    ],
    build: './build/css',
    dist: './dist/css'

  }

};
