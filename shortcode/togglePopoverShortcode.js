import renderTogglePopover from '../core/togglePopover.js';
import copyStylesheetPlugin from './copyStylesheetPlugin.js';
import cssPaths from '../style/index.js';

export { cssPaths };

/**
 * Paired shortcode to create a `<toggle-popover>` custom element.
 *
 * @see https://www.11ty.dev/docs/shortcodes/#paired-shortcodes
 */
export const shortcodeDefaults = {
  shortcode: 'togglePopover',
  hamburgerShortcode: 'hamburgerPopover',
  elementName: 'toggle-popover',
  defaultButtonLabel: 'Toggle menu',
  defaultAnchorPosition: true,
  copyStyleFile: true, // Implies copy and link ??
  cssOutputDir: '/css',
  buttonIcon: false, // Or tokens: 'hamburger', etc. ??
  hideButtonLabel: false
};

export default function togglePopoverShortcode (eleventyConfig, options = {}) {
  const OPT = { ...shortcodeDefaults, ...options };

  const {
    shortcode, elementName, defaultButtonLabel, defaultAnchorPosition,
    hamburgerShortcode, copyStyleFile, cssOutputDir
  } = OPT;

  const stylesheetPath = `${cssOutputDir}/${cssPaths().filename}`;

  eleventyConfig.addPairedShortcode(shortcode, function (content, buttonLabel = defaultButtonLabel, anchorPosition = defaultAnchorPosition) {
    // console.log('ENV:', this.eleventy.env);

    return renderTogglePopover(content, {
      elementName,
      buttonLabel,
      anchorPosition,
      linkStylesheet: copyStyleFile,
      stylesheetPath,
    });
  });

  if (hamburgerShortcode) {
    eleventyConfig.addPairedShortcode(hamburgerShortcode, function (content, buttonLabel = defaultButtonLabel, anchorPosition = defaultAnchorPosition) {
      return renderTogglePopover(content, {
        elementName,
        buttonLabel,
        anchorPosition,
        linkStylesheet: copyStyleFile,
        stylesheetPath,
        buttonIcon: 'line',
        hideButtonLabel: true
      });
    });
  }

  copyStylesheetPlugin(eleventyConfig, { copyStyleFile, cssOutputDir });
}
