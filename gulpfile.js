let gulp = require('gulp')
let sass = require('gulp-sass')(require('sass'))
let sourcemaps = require('gulp-sourcemaps')
let uglify = require('gulp-uglify')
let obfuscate = require('gulp-obfuscate')
let imagemin = require('gulp-imagemin')

function cSass() {
    return gulp.src('./src/styles/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            style: 'compressed'
        }))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./build/styles'))
}

function cJs() {
    return gulp.src('./src/scripts/*.js')
        .pipe(uglify())
        .pipe(obfuscate())
        .pipe(gulp.dest('./build/scripts'))
}

function cImg() {
    return gulp.src('./src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./build/images'))
}


exports.default = function() {
    gulp.watch('./src/styles/*.scss' , {ignoreInitial: false} , gulp.series(cSass))
    gulp.watch('./src/scripts/*.js' , {ignoreInitial: false} , gulp.series(cJs))
    gulp.watch('./src/images/*' , {ignoreInitial: false} , gulp.series(cImg)) 
}