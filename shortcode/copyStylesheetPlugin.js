import PKG from '../core/package-json.js';

/**
 *
 */
export default function copyStylesheetPlugin (eleventyConfig, options = {}) {
  const { copyStyleFile, cssOutputDir } = options;

  if (copyStyleFile) {
    const cssCopy = {};
    cssCopy[`${getPkgPath()}/style/*.css`] = cssOutputDir;

    eleventyConfig.addPassthroughCopy(cssCopy);
  }
}

export function getPkgPath () {
  return isInNodeModules() ? `./node_modules/${PKG.name}` : '.';
}

export function isInNodeModules () {
  return /node_modules/.test(import.meta.url);
}
