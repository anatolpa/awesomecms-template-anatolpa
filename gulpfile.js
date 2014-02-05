var gulp = require('gulp'),
    clean = require('gulp-clean'),
    jade = require('gulp-jade'),
    minifyCss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    refresh = require('gulp-livereload'),
    lr = require('tiny-lr'),
    server = lr();



var paths = {
    jade   : './layouts/*.jade',
    styles   : './components/styles.scss',
    scripts: './components/**/*.js',
    images : ['./components/**/*.png', './components/**/*.jpg'],
    fonts  : ['./components/b-page/fonts/*']
};

gulp.task('jade', function () {
    return gulp.src(paths.jade)
        .pipe(jade())
        .pipe(gulp.dest('./assets/html'))
        .pipe(refresh(server));
});

gulp.task('styles', function () {
    return gulp.src(paths.styles)
        .pipe(sass({ includePaths: ['./components/'] }))
//        .pipe(concat('styles.css'))
        .pipe(minifyCss())
        .pipe(gulp.dest('./assets/css'))
        .pipe(refresh(server))
        .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('scripts', function () {
    // Minify and copy all JavaScript
    return gulp.src(paths.scripts)
        .pipe(concat('main.js'))
        .pipe(gulp.dest('./assets/js'))
        .pipe(refresh(server));
});

gulp.task('images', function () {
    return gulp.src(paths.images)
        .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
        .pipe(gulp.dest('./assets/images'))
        .pipe(refresh(server))
        .pipe(notify({ message: 'Images task complete' }));
});

gulp.task('fonts', function () {
    return gulp.src(paths.fonts)
        .pipe(gulp.dest('./assets/css/fonts'))
        .pipe(refresh(server));
});

gulp.task('lr-server', function () {
    server.listen(35729, function (err) {
        if (err) return console.log(err);
    });
});

gulp.task('clean', function() {
    return gulp.src(['./assets/css', './assets/js', './assets/'], {read: false})
        .pipe(clean());
});

// Rerun the task when a file changes
gulp.task('watch', function () {
    gulp.watch(paths.jade, ['jade']);
    gulp.watch(paths.styles, ['styles']);
    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch(paths.images, ['images']);
    gulp.watch(paths.fonts, ['fonts']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['lr-server', 'jade', 'styles', 'scripts', 'images', 'fonts', 'watch']);

