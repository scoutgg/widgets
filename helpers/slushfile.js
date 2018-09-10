var gulp = require('gulp'),
    lodash = require('lodash'),
    rename = require('gulp-rename'),
    conflict = require('gulp-conflict'),
    template = require('gulp-template'),
    pluralize = require('pluralize');

gulp.task('default', function (done) {
  var answers = {component: gulp.args.join(' ')}
  answers.property = lodash.camelCase(answers.component)
  answers.component = lodash.kebabCase(answers.component)
  answers.className = lodash.capitalize(answers.property)
  answers.endpoint = pluralize(lodash.snakeCase(answers.property))

  return gulp.src(__dirname + '/templates/component/**/*.{jade,styl,js}')
    .pipe(rename(function rename(file) {
      file.basename = answers.component
      if(~file.dirname.indexOf('components')) {
        file.dirname = 'components/' + answers.component
      }
    }))
    .pipe(conflict('./'))
    .pipe(template(answers))
    .pipe(gulp.dest('./'))
})
