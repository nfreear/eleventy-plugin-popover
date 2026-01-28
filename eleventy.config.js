import debug from 'debug';
import { togglePopoverShortcode } from './index.js';
// import togglePopoverShortcode from 'toggle-popover/eleventy';

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
  // eleventyConfig.setLayoutsDirectory('../_includes/layouts');

  eleventyConfig.addLayoutAlias('demo_page', 'layouts/demo-page.njk');
  // @WAS: eleventyConfig.addLayoutAlias('page', 'layouts/page.njk');

  // Set global permalinks to "resource.html" style.
  eleventyConfig.addGlobalData('permalink', () => {
    return (data) =>
      `${data.page.filePathStem}.${data.page.outputFileExtension}`;
  });

  eleventyConfig.addPlugin(togglePopoverShortcode);
}
