const { src, dest, series, parallel } = require("gulp");
const rename = require("gulp-rename");
const rimraf = require("rimraf");
const sass = require("gulp-sass");
const cleanCss = require("gulp-clean-css");

const outputDir = "./dist";
sass.compiler = require("node-sass");

/**
 * Cleans up the output directory
 */
function clean(cb) {
  rimraf(outputDir, cb);
}

/**
 * SASS processing
 */
function css() {
  return src("./src/scss/entry.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(rename("auth0-theme.css"))
    .pipe(dest(`${outputDir}/css`));
}

/**
 * Minify CSS
 */
function minifyCss() {
  return src(`${outputDir}/css/*.css`)
    .pipe(cleanCss())
    .pipe(rename("auth0-theme.min.css"))
    .pipe(dest(`${outputDir}/css`));
}

exports.clean = clean;
exports.default = series(clean, parallel(series(css, minifyCss)));
