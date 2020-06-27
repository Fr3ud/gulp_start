const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const watch = require('gulp-watch');

gulp.task('hello', function(callback) {
    console.log('Hello World!');
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