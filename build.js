const sass = require('node-sass');
const path = require('path');
const humanize = require('humanize');
const chalk = require('chalk');
const mkdirp = require('mkdirp');
const fs = require('fs');
const minify = require('@node-minify/core');
const cleanCss = require('@node-minify/clean-css');

const outputDir = path.join(__dirname, 'dist');
const outputCssDir = path.join(outputDir, 'css');
const baseFilename = 'auth0-theme';

const buildOptions = {
  input: path.join(__dirname, 'src', 'entry.scss'),
  output: path.join(outputCssDir, `${baseFilename}.css`),
  mapOutput: path.join(outputCssDir, `${baseFilename}.css.map`),
  minOutput: path.join(outputCssDir, `${baseFilename}.min.css`)
};

// Create the output directory if it doesn't exist
mkdirp.sync('dist/css');

// Helper to write buffers
const writeBuffer = (buffer, filename, cb) => {
  const wstream = fs.createWriteStream(filename);
  wstream.write(buffer, err => {
    wstream.close();
    cb(err);
  });
};

// Render SASS files to CSS
sass.render(
  {
    file: buildOptions.input,
    outFile: buildOptions.output,
    sourceMap: true
  },
  (err, result) => {
    // Write the uncompressed CSS data
    writeBuffer(result.css, buildOptions.output, () => {
      console.log(
        `Wrote ${chalk.yellow(path.basename(buildOptions.output))} in ${
          result.stats.duration
        }ms (${chalk.green(humanize.filesize(result.css.byteLength))})`
      );

      // Write the map file
      writeBuffer(result.map, buildOptions.mapOutput, () => {
        console.log(
          `Wrote ${chalk.yellow(
            path.basename(buildOptions.mapOutput)
          )} (${chalk.green(humanize.filesize(result.map.byteLength))})`
        );

        // Minify and write the CSS data to another file (*.min.css)
        minify({
          compressor: cleanCss,
          input: buildOptions.output,
          output: buildOptions.minOutput,
          callback: (err, result) => {
            if (err) {
              console.error(
                chalk.red(`Failed to write ${buildOptions.minOutput}`)
              );
            } else {
              console.log(
                `Wrote ${chalk.yellow(
                  path.basename(buildOptions.minOutput)
                )} (${chalk.green(humanize.filesize(result.length))})`
              );
            }
          }
        });
      });
    });
  }
);
