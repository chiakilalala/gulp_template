// gulpfile.js
var gulp = require('gulp');

// var autoprefixer = require('autoprefixer');
var plumber = require('gulp-plumber');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync').create();

gulp.task('copyHTML', function() {
    return gulp.src('./source/**/*.html')
        .pipe(plumber())
        .pipe(gulp.dest('./public/'));
});

gulp.task('jade', function() {
    // var YOUR_LOCALS = {};

    gulp.src('./source/**/*.jade')
        .pipe($.plumber())
        .pipe($.jade({
            pretty: true
        }))
        .pipe(gulp.dest('./public/'))
        .pipe(browserSync.stream()); //重新整理
});


gulp.task('sass', function() {

    return gulp.src('./source/scss/**/*.scss')

    .pipe($.plumber())
        .pipe($.sourcemaps.init())
        .pipe($.sass().on('error', $.sass.logError))

    //css編譯完成
    .pipe($.postcss())
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest('./public/css'))
        .pipe(browserSync.stream());
});

gulp.task('babel', function() {
    gulp.src('./source/js/**/*.js')
        .pipe($.sourcemaps.init())
        .pipe($.babel({
            presets: ['@babel/env']
        }))
        .pipe($.concat('all.js'))

    .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest('./public/js'))
        .pipe(browserSync.stream());
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./public",
            reloadDebounce: 2000 //重新整理的間隔必須超過 2 秒
        }
    });
});

gulp.task('watch', function() {
    gulp.watch('./source/scss/**/*.scss', ['sass']);
    gulp.watch('./source/**/*.jade', ['jade']);
    gulp.watch('./source/js/**/*.js', ['babel']);
});

gulp.task('default', ['jade', 'sass', 'babel', 'browser-sync', 'watch']);