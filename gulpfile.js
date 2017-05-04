var gulp = require('gulp'),
  connect = require('gulp-connect');

gulp.task('connect', function() {
  connect.server({
    root: ['src', 'path'],
    port: 8080,
    livereload: true
  });
});

gulp.task('html', function () {
  gulp.src('./src/*.html')
    .pipe(connect.reload());
});

gulp.task('css', function () {
  gulp.src('./src/css/*.css')
      .pipe(connect.reload());
});

gulp.task('js', function () {
  gulp.src('./src/js/*.js')
      .pipe(connect.reload());
});


gulp.task('watch', function () {
  gulp.watch(['./src/*.html'], ['html']);
  gulp.watch(['./src/css/*.css'], ['css']);
  gulp.watch(['./src/js/*.js'], ['js']);
});

gulp.task('default', ['connect', 'css', 'js', 'watch']);
