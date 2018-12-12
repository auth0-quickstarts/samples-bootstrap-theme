const { join } = require('path');
const buildCss = require('./css-build');

const outputDir = join(__dirname, '..', 'dist');
const sourceDir = join(__dirname, '..', 'src');
const libName = 'auth0-theme';

const buildContext = {
  outputDir,
  sourceDir,
  libName
};

buildCss(buildContext).then(() => console.log('Done'));
