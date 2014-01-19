var gulp = require('gulp'),
    clean = require('gulp-clean'),
    jade = require('gulp-clean'),
    minifiCss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify');
gulp.task('template:jade', function(){
    return gulp.src('./layouts/*.jade')
        .pipe(jade())
        .pipe(gulp.dest('./assets/html'));
});

gulp.task('css:sass', function () {
    gulp.src('./components/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./assets/css'));
});

gulp.task('default', function(){
    gulp.run('template:jade', 'css:sass');

    gulp.watch('./layouts/*.jade', function(){
        gulp.run('template:jade');
    });
});