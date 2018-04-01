var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('autoprefixer');
var wait = require('gulp-wait');
var postcss = require('gulp-postcss');
var plumber = require('gulp-plumber');
var server = require('browser-sync').create();

gulp.task('style', function() {
  gulp.src('source/sass/style.scss')
    .pipe(plumber())
    .pipe(wait(300))
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest('source/css'))
    .pipe(server.stream());
});

gulp.task('serve', ['style'], function() {
  server.init({
    server: 'source/',
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch('source/sass/**/*.{scss,sass}', ['style']);
  gulp.watch('source/*.html').on('change', server.reload);
});
