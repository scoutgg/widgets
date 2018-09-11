const gulp = require('gulp')
const browserify = require('browserify')
const source = require('vinyl-source-stream')
const buffer = require('vinyl-buffer')
const babelify = require('babelify')
const rename = require('gulp-rename')
const uglify = require('gulp-uglify')
var uglifyOpts = {
  global: true,
  mangle: {
    safari10: true,
  },
}
gulp.task('default', function () {
    return browserify('src/index.js')
      .transform('uglifyify', uglifyOpts)
      .bundle()
      .pipe(source('application.js')) // Converts To Vinyl Stream
      .pipe(buffer()) // Converts Vinyl Stream To Vinyl Buffer
      // Gulp Plugins Here!
      .pipe(gulp.dest('build'));
});
