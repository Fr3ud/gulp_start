const gulp = require('gulp');
const browserSync = require('browser-sync').create();

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