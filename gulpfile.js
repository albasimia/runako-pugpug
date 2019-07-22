/**************************************************
 * modules load
 *************************************************/
const gulp   = require('gulp');
const fs     = require('fs');
// gulp-pugに変更。変数名も変えたよ。
const pug   = require('gulp-pug');
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
// 指定するのが面倒なのでtask名をdefaultに変更
gulp.task('default', (done) => {
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
        .pipe(pug({
          pretty: true
        }))
        .pipe(gulp.dest(dest));
  }
  // gulp4系から明示的に終了のコールバックを実行しないとエラーが出るので追加。
  done();
});