const { join, basename } = require('path');
const sass = require('node-sass');
const humanize = require('humanize');
const chalk = require('chalk');
const mkdirp = require('mkdirp');
const cleanCss = require('clean-css');
const { promisify } = require('util');
const { writeBuffer, readFileAsync, writeFileAsync } = require('./utils');

const renderAsync = promisify(sass.render);

module.exports = async context => {
  const outputDir = join(context.outputDir, 'css');
  const inputFile = join(context.sourceDir, 'scss', 'entry.scss');
  const outputFile = join(outputDir, `${context.libName}.css`);
  const outputMapFile = join(outputDir, `${context.libName}.css.map`);
  const outputMinFile = join(outputDir, `${context.libName}.min.css`);
  const outputMinMapFile = join(outputDir, `${context.libName}.min.css.map`);

  // Create the output directory if it doesn't exist
  mkdirp.sync(outputDir);

  // Render SASS files to CSS
  try {
    const result = await renderAsync({
      file: inputFile,
      outFile: outputFile,
      sourceMap: true
    });

    // Write the uncompressed CSS data
    await writeBuffer(result.css, outputFile);
    console.log(
      `Wrote ${chalk.yellow(basename(outputFile))} in ${
        result.stats.duration
      }ms (${chalk.green(humanize.filesize(result.css.byteLength))})`
    );

    // Write the map file
    await writeBuffer(result.map, outputMapFile);
    console.log(
      `Wrote ${chalk.yellow(basename(outputMapFile))} (${chalk.green(
        humanize.filesize(result.map.byteLength)
      )})`
    );

    // Read the unminified css that has just been created
    const cssContents = await readFileAsync(outputFile, 'utf-8');

    // Minify the css..
    const { styles: minifiedStyles, sourceMap } = new cleanCss({
      sourceMap: true
    }).minify(cssContents);

    // Write it to a file..
    await writeFileAsync(outputMinFile, minifiedStyles);
    console.log(
      `Wrote ${chalk.yellow(basename(outputMinFile))} (${chalk.green(
        humanize.filesize(minifiedStyles.length)
      )})`
    );

    // Minified map file..
    await writeFileAsync(outputMinMapFile, sourceMap);
    console.log(
      `Wrote ${chalk.yellow(basename(outputMinMapFile))} (${chalk.green(
        humanize.filesize(sourceMap.length)
      )})`
    );
  } catch (e) {
    console.error(e);
  }
};
