const { src, dest, task } = require('gulp'); // dest-функция записывает результат
const rm = require('gulp-rm'); // удаляет папки

task('clean', () => {
  return src('dist/**/*', { read: false }).pipe(rm());
});

function copy() {
  return src('src/scss/main.scss').pipe(dest('dist'));
}

exports.copy = copy;
