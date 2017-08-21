const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const eslint = require('gulp-eslint');

gulp.task('develop', function () {
    var stream = nodemon({
        script: 'static_server.js'
        , ext: 'html js'
        , ignore: ['ignored.js']
        , tasks: ['lint']
    });

    stream
        .on('restart', function () {
            //console.log('restarted!');
        })
        .on('crash', function () {
            //console.error('Application has crashed!\n')
            stream.emit('restart', 10);  // restart the server in 10 seconds 
        });
});

gulp.task('lint', () => {
    return gulp.src(['**/*.js','!node_modules/**']) 
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});
 
// gulp.task('default', ['lint'], function () {
// });