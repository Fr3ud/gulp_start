const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const watch = require('gulp-watch');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const pug = require('gulp-pug');

gulp.task('mantra', function() {
    while('ego') {
        console.log('om mani padme hum');
    }
});

gulp.task('pug', function() {
    return gulp.src('./app/pug/pages/**/*.pug')
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
        .pipe(gulp.dest('./app/'));
});

gulp.task('scss', function() {
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
});

gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "./app/"
        }
    })
});

gulp.task('watch', function() {
    watch('./app/pug/**/*.pug', gulp.parallel('pug'));
    watch('./app/scss/**/*.scss', gulp.parallel('scss'));
    watch('./app/*.html', gulp.parallel(browserSync.reload));
    watch('./app/css/**/*.css', gulp.parallel(browserSync.reload));
});

gulp.task('start', gulp.parallel('pug', 'scss', 'server', 'watch'));