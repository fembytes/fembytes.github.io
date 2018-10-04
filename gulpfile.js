var gulp = require('gulp');
var sass = require('gulp-sass');
var clean = require('gulp-clean-css');
var rename = require('gulp-rename');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var webpack = require('gulp-webpack');

var gutil = require('gulp-util')

var paths = {
    'scss': ['./src/scss/*.scss', '.src/scss/*.css'],
    'js': ['./src/js/*.js'],
    'fonts': ['./node_modules/mdi/fonts/*.**']
}

gulp.task('default', ['watch', 'css', 'js', 'fonts']);

gulp.task('css', function() {
    return gulp.src('./src/scss/main.scss')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(rename('app.min.css'))
        .pipe(gulp.dest('./dist/css/'));
});

gulp.task('js', function() {
    return js()
        .pipe(rename('app.min.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js/'));
});

gulp.task('fonts', function() {
    return gulp.src(paths.fonts)
        .pipe(gulp.dest('./dist/fonts/'));
});

gulp.task('watch', function() {
    gulp.watch(paths.scss, ['css']);
    gulp.watch(paths.js, ['js']);
    gulp.watch(paths.fonts, ['fonts']);
});

function js() {
  return gulp.src('./src/js/app.js')
    .pipe(webpack({
      externals: {
        jquery: 'jQuery'
      },
      module: {
        loaders: [{
          test: /\.js$/,
          exclude: /(node_modules)/,
          loader: 'babel',
          query: { presets: ['es2015'] }
        }]
      }
    }));
}
