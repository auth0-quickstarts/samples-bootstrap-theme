const { src, dest, series, parallel } = require('gulp');
const rename = require('gulp-rename');
const rimraf = require('rimraf');
const sass = require('gulp-sass');
const cleanCss = require('gulp-clean-css');

const outputDir = './dist';
sass.compiler = require('node-sass');

/**
 * Cleans up the output directory
 */
function clean(cb) {
  rimraf(outputDir, cb);
};

/**
 * JavaScript asset copy
 */
function js() {
  return src('./node_modules/bootstrap/dist/js/bootstrap.min.js')
    .pipe(rename('auth0-theme.min.js'))
    .pipe(dest(`${outputDir}/js`));
};

/**
 * SASS processing
 */
function css() {
  return src('./src/scss/entry.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(rename('auth0-theme.css'))
    .pipe(dest(`${outputDir}/css`));
}

/**
 * Minify CSS
 */
function minifyCss() {
  return src(`${outputDir}/css/*.css`)
    .pipe(cleanCss())
    .pipe(rename('auth0-theme.min.css'))
    .pipe(dest(`${outputDir}/css`));
}

function copyImages() {
  return src('./src/images/**/*')
    .pipe(dest(`${outputDir}/images`));
}

exports.clean = clean;
exports.default = series(clean, 
  parallel(
    js, 
    series(css, minifyCss),
    copyImages
  ));
