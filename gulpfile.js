const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const watch = require('gulp-watch');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const fileinclude = require('gulp-file-include');

gulp.task('hello', function(callback) {
    console.log('Hello World!');
    callback();
});

gulp.task('html', function(callback) {
    return gulp.src('./app/html/*.html')
        .pipe(plumber({
            errorHandler: notify.onError(function(err) {
                return {
                    title: 'HTML',
                    sound: false,
                    message: err.message
                }
            })
        }))
        .pipe(fileinclude({ prefix: '@@' }))
        .pipe(gulp.dest('./app/'));

    callback();
});

gulp.task('scss', function(callback) {
    return gulp.src('./app/scss/main.scss')
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
        .pipe(gulp.dest('./app/css/'));

    callback();
});

gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "./app/"
        }
    })
});

gulp.task('watch', function() {
    watch('./app/html/**/*.html', gulp.parallel('html'));
    watch('./app/scss/**/*.scss', gulp.parallel('scss'));
    watch('./app/*.html', gulp.parallel(browserSync.reload));
    watch('./app/css/**/*.css', gulp.parallel(browserSync.reload));
});

gulp.task('start', gulp.parallel('html', 'scss', 'server', 'watch'));