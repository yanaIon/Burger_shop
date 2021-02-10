const { src, dest, task, series } = require('gulp'); // dest-функция записывает результат
const rm = require('gulp-rm'); // удаляет папки
const sass = require('gulp-sass'); // компилирует файлы scss в css
const concat = require('gulp-concat'); //склеивает файлы в один

sass.compiler = require('node-sass'); //компилятор на node,js

task('clean', () => {
  return src('dist/**/*', { read: false }).pipe(rm());
});

task('copy', () => {
  return src('src/scss/main.scss').pipe(dest('dist'));
});

const styles = [
  'node_modules/normalize.css/normalize.css',
  'src/scss/main.scss',
];
task('styles', () => {
  return src(styles)
    .pipe(concat('main.scss'))
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('dist'));
});

task('default', series('clean', 'styles'));
