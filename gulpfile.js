var gulp = require('gulp');
var gutil = require('gulp-util');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var bump = require('gulp-bump');
var uglify = require('gulp-uglify');
var pkg = require('./package.json');


var NAME = 'jquery.drilldown';

gulp.task('bump', function () {
  return gulp.src(['package.json', 'bower.json'])
      .pipe(bump({ type: gutil.env.type }))
      .pipe(gulp.dest('.'));
});

gulp.task('dist:orig', function () {
  return gulp.src('index.js')
      .pipe(replace('$VERSION$', pkg.version))
      .pipe(rename(NAME + '.js'))
      .pipe(gulp.dest('dist'));
});

gulp.task('dist', ['dist:orig'], function () {
  return gulp.src('dist/' + NAME + '.js')
      .pipe(uglify({
        preserveComments: 'some'
      }))
      .pipe(rename(NAME + '.min.js'))
      .pipe(gulp.dest('dist'));
});
