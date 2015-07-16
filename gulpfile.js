var gulp = require('gulp');
var mocha = require('gulp-mocha');
var jshint = require('gulp-jshint');

gulp.task('default', ['test', 'jshint', 'watch']);

gulp.task('test', function() {
  return gulp.src('test/*test.js')
             .pipe(mocha());
});

gulp.task('jshint', function() {
  return gulp.src(['*.js', 'test/*test.js'])
             .pipe(jshint())
             .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('watch', function() {
  gulp.watch(['*.js', 'test/*test.js'], ['test', 'jshint']);
});
