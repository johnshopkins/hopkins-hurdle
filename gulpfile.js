import gulp from'gulp';
import { Tasker } from 'gulp-tasks';

import { config } from './config/gulp.js';

const tasker = new Tasker(config);
const tasks = {
  js: tasker.getTask('js'),
  scss: tasker.getTask('scss')
};

const defaultTask = gulp.parallel(tasks.js, tasks.scss);

export default defaultTask;

export const watch = () => {

  defaultTask();
  gulp.watch(['./src/js/**/*.js'], tasks.js);
  gulp.watch(['./src/css/**/*.scss'], tasks.scss);

};
