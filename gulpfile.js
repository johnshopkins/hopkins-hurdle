const gulp       = require('gulp');
const { Tasker } = require('gulp-tasks');

const config = require('./config/gulp');

const tasker = new Tasker(config);
const tasks = {
  js: tasker.getTask('js'),
  scss: tasker.getTask('scss')
};

const defaultTask = gulp.parallel(tasks.js, tasks.scss);

exports.default = defaultTask;

exports.watch = () => {

  defaultTask();
  gulp.watch(['./src/js/**/*.js'], tasks.js);
  gulp.watch(['./src/css/**/*.scss'], tasks.scss);

};
