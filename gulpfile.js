'use strict';

var gulp = require('gulp');
var shrinkwrap  = require('gulp-shrinkwrap');
var gulpNSP     = require('gulp-nsp');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');

gulp.task('nsp', function(cb) {
  return gulpNSP({
      shrinkwrap: __dirname + '/npm-shrinkwrap.json',
      package: __dirname + '/package.json',
      output: 'default',
      stopOnError: false
  }, cb);
});

gulp.task('shrinkwrap', function() {	
  return gulp.src('./package.json')
         .pipe(shrinkwrap.lock())
         .pipe(gulp.dest('./'));
});

gulp.task('mochaTest', function (cb) {
  gulp.src(['common/**/*.js','server/**/*.js'])
    .pipe(istanbul()) // Covering files
    .pipe(istanbul.hookRequire()) // Force `require` to return covered files
    .on('finish', function () {

      process.env.NODE_ENV = 'unittest';
      var app = require('./server/server');
      var instance = app.start(function(err,serverInstance){
        if(err) {
          console.log(err);
          return cb();
        }
        gulp.src(['test/*.js'])
          .pipe(mocha({ timeout: 10000 }))
          .pipe(istanbul.writeReports({dir:'reports/coverage'}))// Creating the reports after tests runned
          .on('end', function(){
            (serverInstance || instance).close();
            cb();
          });
      });
    });
});

gulp.task('default', ['shrinkwrap','nsp'], function() {});

gulp.task('build', ['default']);
