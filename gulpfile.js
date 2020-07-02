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
        .pipe(gulp.dest('./build/'));
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
        .pipe(gulp.dest('./build/css/'));
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
    watch('./build/*.html', gulp.parallel(browserSync.reload));
    watch('./build/css/**/*.css', gulp.parallel(browserSync.reload));
});

gulp.task('start', gulp.parallel('pug', 'scss', 'server', 'watch'));