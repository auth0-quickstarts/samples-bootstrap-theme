const { join } = require('path');
const buildCss = require('./css-build');
const buildJs = require('./js-build');

const outputDir = join(__dirname, '..', 'dist');
const sourceDir = join(__dirname, '..', 'src');
const modulesDir = join(__dirname, '..', 'node_modules');
const libName = 'auth0-theme';

const buildContext = {
  outputDir,
  sourceDir,
  libName,
  modulesDir
};

Promise.all([buildCss(buildContext), buildJs(buildContext)]);
