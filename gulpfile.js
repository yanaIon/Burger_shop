const { src, dest, task, series, watch } = require('gulp'); // dest-функция записывает результат
const rm = require('gulp-rm'); // удаляет папки
const sass = require('gulp-sass'); // компилирует файлы scss в css
const concat = require('gulp-concat'); //склеивает файлы в один
const browserSync = require('browser-sync').create(); //открывать сайт в браузере
const reload = browserSync.reload; // перезагружает стр сайта при изменениях
const sassGlob = require('gulp-sass-glob'); //удобное подклбчение всезх файлов в main.scss
const autoprefixer = require('gulp-autoprefixer'); // autoprefixer
const px2rem = require('gulp-smile-px2rem'); // переводит px to rem
const gcmq = require('gulp-group-css-media-queries'); // группирует одинаковые медиа запросы

sass.compiler = require('node-sass'); //компилятор на node,js

task('clean', () => {
  return src('dist/**/*', { read: false }).pipe(rm());
});

task('copy:html', () => {
  return src('src/*.html')
    .pipe(dest('dist'))
    .pipe(reload({ stream: true }));
});

const styles = [
  'node_modules/normalize.css/normalize.css',
  'src/scss/main.scss',
];
task('styles', () => {
  return src(styles)
    .pipe(concat('main.scss'))
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    .pipe(px2rem())
    .pipe(
      autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false,
      })
    )
    .pipe(gcmq())
    .pipe(dest('dist'));
});

task('server', () => {
  browserSync.init({
    server: {
      baseDir: './dist',
    },
    open: false,
  });
});

watch('./src/scss/**/*.scss', series('styles')); // следит за изменениями в scss
watch('./src/*.html', series('copy:html')); // следит за изменениями в html

task('default', series('clean', 'copy:html', 'styles', 'server'));
