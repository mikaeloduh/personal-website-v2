var gulp       = require('gulp');
// var connect    = require('gulp-connect');
var Connect = require('gulp-connect-php');
var browserSync = require('browser-sync');
/*
gulp.task('connect', function() {
  connect.server({
    root: ['src', 'path'],
    port: 8080,
    livereload: true
  });
});
*/
gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: 'src'
    },
    startPath: "/index.html"
  });
});


gulp.task('html', function () {
  gulp.src('./src/*.html')
    // .pipe(connect.reload());
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('css', function () {
  gulp.src('./src/css/*.css')
      // .pipe(connect.reload());
      .pipe(browserSync.reload({stream:true}))
});

gulp.task('js', function () {
  gulp.src('./src/js/*.js')
      // .pipe(connect.reload());
      .pipe(browserSync.reload({stream:true}))
});

gulp.task('php', function () {
  gulp.src('**/*.php')
    // .pipe(connect.reload());
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('watch', function () {
  gulp.watch(['./src/*.html'], ['html']);
  gulp.watch(['./src/css/*.css'], ['css']);
  gulp.watch(['./src/js/*.js'], ['js']);
  gulp.watch(['**/*.php'], ['php']);
});


// gulp.task('default', ['connect', 'watch']);
gulp.task('default', ['browser-sync', 'watch']);