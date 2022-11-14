import babelify from 'babelify';

export const config = {

  js: {

    compile: [
      {
        src: ['./src/js/*.js'],
        transform: [
          ['browserify-shim', { global: true }],
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

  move: [
    {
      src: './src/images/**/*',
      build: './build/images',
      dist: './dist/images'
    }
  ],

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
