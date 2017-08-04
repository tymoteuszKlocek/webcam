var gulp = require('gulp'),
    connect = require('gulp-connect');

gulp.task('connect', function () {
    connect.server({
        livereload: true
    });
});

gulp.task('html', function () {
    gulp.src('./appView/*.html')
        .pipe(connect.reload());
});

gulp.task('js', function () {
    gulp.src('./appView/**/*.js')
        .pipe(connect.reload());
});

gulp.task('watch', function () {
    gulp.watch(['./appView/*.html'], ['html']);
    gulp.watch(['./appView/**/*.js'], ['js']);
});

gulp.task('default', ['connect', 'watch']);