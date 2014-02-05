var gulp = require('gulp'),
    clean = require('gulp-clean'),
    jade = require('gulp-jade'),
    minifyCss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    refresh = require('gulp-livereload'),
    imagemin = require('gulp-imagemin'),
    lr = require('tiny-lr'),
    server = lr();

var paths = {
    jade: './layouts/*.jade',
    scss: './components/styles.scss',
    scripts: './components/**/*.js',
    images: ['./components/**/*.png', './components/**/*.jpg'],
    fonts: ['./components/b-page/fonts/*']
};

gulp.task('template:jade', function() {
    return gulp.src(paths.jade)
        .pipe(jade())
        .pipe(gulp.dest('./assets/html'))
        .pipe(refresh(server));
});

gulp.task('css:sass', function() {
    gulp.src(paths.scss)
        .pipe(sass({ includePaths : ['./components/'] }))
        .pipe(concat('styles.css'))
        .pipe(minifyCss())
        .pipe(gulp.dest('./assets/css'))
        .pipe(refresh(server));
});

gulp.task('js:scripts', function() {
    // Minify and copy all JavaScript
    return gulp.src(paths.scripts)
//        .pipe(concat("scripts.min.js"))
        .pipe(uglify())
        .pipe(gulp.dest('./assets/js'))
        .pipe(refresh(server));
});

gulp.task('images', function() {
    gulp.src(paths.images)
        .pipe(imagemin())
        .pipe(gulp.dest('./assets/images'))
        .pipe(refresh(server));
});

gulp.task('fonts', function() {
    gulp.src(paths.fonts)
        .pipe(gulp.dest('./assets/css/fonts'))
        .pipe(refresh(server));
});

gulp.task('lr-server', function() {
    server.listen(35729, function(err) {
        if(err) return console.log(err);
    });
});

gulp.task('default', function() {
    gulp.run('lr-server', 'template:jade', 'css:sass', 'js:scripts', 'images', 'fonts');

    // add watchers to jade, scss, js, images files
    gulp.watch(paths.jade, function(){
        gulp.run('template:jade');
    });

    gulp.watch(paths.scss, function(){
        gulp.run('css:sass');
    });

    gulp.watch(paths.scripts, function(){
        gulp.run('js:scripts');
    });

    gulp.watch(paths.images, function(){
        gulp.run('images');
    });

    gulp.watch(paths.fonts, function(){
        gulp.run('fonts');
    });


});