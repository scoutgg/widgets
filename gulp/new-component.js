var gulp = require('gulp'),
    lodash = require('lodash'),
    handlebars = require('handlebars'),
    fs = require('fs'),
    pluralize = require('pluralize');

gulp.task('create-component', function (done) {
  var answers = {component: process.argv.slice(2)[1]}
  answers.property = lodash.camelCase(answers.component)
  answers.component = lodash.kebabCase(answers.component)
  answers.className = lodash.capitalize(answers.property[0]) + answers.property.slice(1, answers.property.length)
  answers.endpoint = pluralize(lodash.snakeCase(answers.property))
  if(!fs.existsSync(`${__dirname}/../src/components/${answers.component}`)) {
    fs.mkdirSync(`${__dirname}/../src/components/${answers.component}`)
  }
  const file = fs.readFileSync(`${__dirname}/../helpers/templates/component.js`, 'utf-8')
  fs.writeFileSync(`${__dirname}/../src/components/${answers.component}/${answers.component}.js`, handlebars.compile(file)(answers))
})
