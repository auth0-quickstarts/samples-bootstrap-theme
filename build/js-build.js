const fs = require('fs');
const { join } = require('path');
const { yellow, green } = require('chalk');
const util = require('./utils');

module.exports = async context => {
  const outputJsFilename = 'auth0-theme.min.js';

  await util.mkdirAsync(join(context.outputDir, 'js'));

  // Copy the bootstrap js straight to the output
  await util.copyFileAsync(
    join(context.modulesDir, 'bootstrap', 'dist', 'js', 'bootstrap.min.js'),
    join(context.outputDir, 'js', outputJsFilename)
  );

  console.log(
    `Copied ${yellow('bootstrap.min.js')} to ${green(
      `dist/${outputJsFilename}`
    )}`
  );
};
