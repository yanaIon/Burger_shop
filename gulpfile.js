const { src, dest, task, series, watch } = require('gulp'); // dest-функция записывает результат
const rm = require('gulp-rm'); // удаляет папки
const sass = require('gulp-sass'); // компилирует файлы scss в css
const concat = require('gulp-concat'); //склеивает файлы в один
const browserSync = require('browser-sync').create(); //открывать сайт в браузере
const reload = browserSync.reload; // перезагружает стр сайта при изменениях
const sassGlob = require('gulp-sass-glob'); //удобное подклбчение всезх файлов в main.scss
const autoprefixer = require('gulp-autoprefixer'); // autoprefixer
//const px2rem = require('gulp-smile-px2rem'); // переводит px to rem
const gcmq = require('gulp-group-css-media-queries'); // группирует одинаковые медиа запросы
const cleanCSS = require('gulp-clean-css'); //сжимает файл
const sourcemaps = require('gulp-sourcemaps'); //показывает на какой строчке расп интер.код
const babel = require('gulp-babel'); // переводит новый синтаксис js в старый
const uglify = require('gulp-uglify'); // сжимает js

sass.compiler = require('node-sass'); //компилятор на node,js

task('clean', () => {
  return src('dist/**/*', { read: false }).pipe(rm());
});

task('copy:html', () => {
  return src('src/*.html')
    .pipe(dest('dist'))
    .pipe(reload({ stream: true }));
});

task('copy:fonts', () => {
  return src('src/fonts/**/*')
    .pipe(dest('dist/fonts'))
    .pipe(reload({ stream: true }));
});

task('copy:img', () => {
  return src('src/img/**/*')
    .pipe(dest('dist/img'))
    .pipe(reload({ stream: true }));
});

const styles = [
  'node_modules/normalize.css/normalize.css',
  'src/scss/main.scss',
];
task('styles', () => {
  return (
    src(styles)
      .pipe(sourcemaps.init())
      .pipe(concat('main.min.scss'))
      .pipe(sassGlob())
      .pipe(sass().on('error', sass.logError))
      //.pipe(px2rem())
      .pipe(
        autoprefixer({
          browsers: ['last 2 versions'],
          cascade: false,
        })
      )
      .pipe(gcmq())
      .pipe(cleanCSS())
      .pipe(sourcemaps.write())
      .pipe(dest('dist'))
      .pipe(reload({ stream: true }))
  );
});

const libs = ['node_modules/jquery/dist/jquery.js', 'src/scripts/*.js'];

task('scripts', () => {
  return src(libs)
    .pipe(sourcemaps.init())
    .pipe(concat('main.min.js', { newLine: ';' }))
    .pipe(
      babel({
        presets: ['@babel/env'],
      })
    )
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(dest('dist'))
    .pipe(reload({ stream: true }));
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
watch('./src/fonts/**/*', series('copy:fonts')); // следит за изменениями шрифтов
watch('./src/img/**/*', series('copy:img')); // следит за изменениями в картинках
watch('src/scripts/*.js*', series('scripts')); // следит за изменениями в js

task(
  'default',
  series(
    'clean',
    'copy:html',
    'copy:fonts',
    'copy:img',
    'styles',
    'scripts',
    'server'
  )
);
