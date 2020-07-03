const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const watch = require('gulp-watch');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const pug = require('gulp-pug');
const del = require('del');

gulp.task('mantra', function() {
    while('ego') {
        console.log('om mani padme hum');
    }
});

gulp.task('pug', function() {
    return gulp.src('./src/pug/pages/**/*.pug')
        .pipe(plumber({
            errorHandler: notify.onError(function(err) {
                return {
                    title: 'Pug',
                    sound: false,
                    message: err.message
                }
            })
        }))
        .pipe(pug({
            doctype: 'html',
            pretty: true
        }))
        .pipe(gulp.dest('./build/'))
        .pipe(browserSync.stream());
});

gulp.task('scss', function() {
    return gulp.src('./src/scss/main.scss')
        .pipe(plumber({
            errorHandler: notify.onError(function(err) {
                return {
                    title: 'Styles',
                    sound: false,
                    message: err.message
                }
            })
        }))
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 4 versions']
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./build/css/'))
        .pipe(browserSync.stream());
});

gulp.task('copy:img', function() {
    return gulp.src('./src/img/**/*.*')
        .pipe(gulp.dest('./build/img/'));
});

gulp.task('copy:js', function() {
    return gulp.src('./src/js/**/*.*')
        .pipe(gulp.dest('./build/js/'));
});

gulp.task('clean:build', function() {
    return del('./build');
});

gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "./build/"
        }
    })
});

gulp.task('watch', function() {
    watch('./src/pug/**/*.pug', gulp.parallel('pug'));
    watch('./src/scss/**/*.scss', gulp.parallel('scss'));
    watch('./src/img/**/*.*', gulp.parallel('copy:img'));
    watch('./src/js/**/*.*', gulp.parallel('copy:js'));

    watch(['./build/img/**/*.*', './build/js/**/*.*'], 
        gulp.parallel(browserSync.reload));
});

gulp.task('start', gulp.series(
    gulp.parallel('clean:build'),
    gulp.parallel('copy:img', 'copy:js', 'pug', 'scss'), 
    gulp.parallel('server', 'watch')
));