'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var wiredep = require('wiredep').stream;

module.exports = function (options) {
    gulp.task('inject', ['scripts', 'styles', 'bless'], function () {

        var injectStyles = gulp.src([
            options.tmp + '/serve/blessed-styles/*.css',
            '!' + options.tmp + '/serve/blessed-styles/vendor.css'
        ], {read: false});

        var sortOutput = require('../' + options.tmp + '/sortOutput.json');

        var injectScripts = gulp.src([
            '{' + options.src + ',' + options.tmp + '/serve}/app/**/*.js',
            '!' + options.src + '/app/**/*.spec.js',
            '!' + options.src + '/app/**/*.mock.js'
        ], {read: false})
            .pipe($.order(sortOutput, {base: options.tmp + '/serve/app'}));

        var injectOptions = {
            ignorePath: [options.src, options.tmp + '/serve'],
            addRootSlash: false
        };

        return gulp.src(options.src + '/*.html')
            .pipe($.inject(injectStyles, injectOptions))
            .pipe($.inject(injectScripts, injectOptions))
            .pipe(wiredep(options.wiredep))
            .pipe(gulp.dest(options.tmp + '/serve'));

    });
};
