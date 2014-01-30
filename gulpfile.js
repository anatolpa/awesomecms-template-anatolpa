var gulp = require('gulp'),
    clean = require('gulp-clean'),
    jade = require('gulp-jade'),
    minifiCss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    refresh = require('gulp-livereload'),
    lr = require('tiny-lr'),
    server = lr();

gulp.task('template:jade', function() {
    return gulp.src('./layouts/*.jade')
        .pipe(jade())
        .pipe(gulp.dest('./assets/html'))
        .pipe(refresh(server));
});

gulp.task('css:sass', function() {
    gulp.src('./components/**/*.scss')
        .pipe(sass({includePaths: ['./components/']}))
        .pipe(gulp.dest('./assets/css'))
        .pipe(refresh(server));
});

gulp.task('js:scripts', function() {
    // Minify and copy all JavaScript
    return gulp.src('./components/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./assets/js'))
        .pipe(refresh(server));
});

gulp.task('lr-server', function() {
    server.listen(35729, function(err) {
        if(err) return console.log(err);
    });
});

gulp.task('default', function() {
    gulp.run('lr-server', 'template:jade', 'css:sass', 'js:scripts');

    // add watchers to jade, scss, js files
    gulp.watch('./layouts/*.jade', function(){
        gulp.run('template:jade');
    });

    gulp.watch('./components/**/*.scss', function(){
        gulp.run('css:sass');
    });

    gulp.watch('./components/**/*.js', function(){
        gulp.run('js:scripts');
    });

});