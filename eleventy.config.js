import togglePopoverShortcode from './index.js';

/**
 * Configure Test Eleventy.
 *
 * @see https://www.11ty.dev/docs/config/
 */
export default async function (eleventyConfig) {
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
