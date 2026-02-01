import PKG from '../core/package-json.js';

/**
 * Copy both stylesheet and browser JavaScript files.
 */
export default function copyStyleAndScriptPlugin (eleventyConfig, options = {}) {
  copyStylesheetFile(eleventyConfig, options);
  copyJavascriptFile(eleventyConfig, options);
}

export function copyStylesheetFile (eleventyConfig, options) {
  const { copyStyleFile, cssOutputDir } = options;

  if (copyStyleFile) {
    const cssCopy = {};
    cssCopy[`${getPkgPath()}/style/*.css`] = cssOutputDir;

    eleventyConfig.addPassthroughCopy(cssCopy);
  }
}

export function copyJavascriptFile (eleventyConfig, options) {
  const { copyScriptFile, jsOutputDir } = options;

  if (copyScriptFile) {
    const jsCopy = {};
    jsCopy[`${getPkgPath()}/browser/*.js`] = jsOutputDir;

    eleventyConfig.addPassthroughCopy(jsCopy);
  }
}

export function getPkgPath () {
  return isInNodeModules() ? `./node_modules/${PKG.name}` : '.';
}

export function isInNodeModules () {
  return /node_modules/.test(import.meta.url);
}
