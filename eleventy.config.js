import debug from 'debug';
// import { togglePopoverShortcode } from './index.js';
import togglePopoverShortcode from 'toggle-popover/eleventy';

/**
 * Configure Test Eleventy.
 *
 * @see https://www.11ty.dev/docs/config/
 */
export default async function (eleventyConfig) {
  const debugLog = debug('TP:config');

  debugLog('Loading config…');

  // Order matters, put this at the top of your configuration file.
  eleventyConfig.setInputDirectory('demo');

  eleventyConfig.setIncludesDirectory('_includes');

  eleventyConfig.addLayoutAlias('demo_page', 'layout/demo-page.njk');

  // Set global permalinks to "resource.html" style.
  eleventyConfig.addGlobalData('permalink', () => {
    return (data) =>
      `${data.page.filePathStem}.${data.page.outputFileExtension}`;
  });

  eleventyConfig.addPassthroughCopy({ './demo/css/*.css': 'css' });

  /**
   * Add the plugin to Eleventy.
   */
  eleventyConfig.addPlugin(togglePopoverShortcode);
}
