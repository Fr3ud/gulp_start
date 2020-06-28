const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const watch = require('gulp-watch');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('hello', function(callback) {
    console.log('Hello World!');
    callback();
});

gulp.task('scss', function(callback) {
    return gulp.src('./app/scss/main.scss')
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
    watch(['./app/*.html', '.app/css/**/*.css'], gulp.parallel(browserSync.reload));
});

gulp.task('start', gulp.parallel('server', 'watch'));