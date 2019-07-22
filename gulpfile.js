/**************************************************
 * modules load
 *************************************************/
const gulp   = require('gulp');
const fs     = require('fs');
const jade   = require('gulp-pug');
const data   = require('gulp-data');
const rename = require('gulp-rename');

/**************************************************
 * config
 *************************************************/
const template = './src/pug/planTemplate.pug';
const jsonPath = './src/json/planData.json';
const dest     = './dest/';

/**************************************************
 * task
 *************************************************/
gulp.task('pug', () => {
  const json = JSON.parse(fs.readFileSync(jsonPath));

  for (let key of json) {
    gulp.src(template)
        .pipe(rename(key.no + ".html"))
        .pipe(data (function (file){
          return {
            'fileName': file.path.split('/').pop().replace('.html', ''),
            'planList': json
          }
        }))
        .pipe(jade({
          pretty: true
        }))
        .pipe(gulp.dest(dest));
  }
});