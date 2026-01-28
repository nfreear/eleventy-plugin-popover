import renderTogglePopover from '../core/togglePopover.js';
import cssPath from '../style/index.js';

export { cssPath };

/**
 * Paired shortcode to create a `<toggle-popover>` custom element with declarative shadow DOM.
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
  cssOutputDir: 'css',
  buttonIcon: false, // Or tokens: 'hamburger', etc. ??
  hideButtonLabel: false
};

export default function togglePopoverShortcode (eleventyConfig, options = {}) {
  const OPT = { ...shortcodeDefaults, ...options };

  const { shortcode, elementName, defaultButtonLabel, defaultAnchorPosition,
    hamburgerShortcode, copyStyleFile } = OPT;

  eleventyConfig.addPairedShortcode(shortcode, function (content, buttonLabel = defaultButtonLabel, anchorPosition = defaultAnchorPosition) {
    return renderTogglePopover(content, {
      elementName,
      buttonLabel,
      anchorPosition,
      linkStylesheet: copyStyleFile,
      // stylesheetPath: null,
    });
  });

  if (hamburgerShortcode) {
    eleventyConfig.addPairedShortcode(hamburgerShortcode, function (content, buttonLabel = defaultButtonLabel, anchorPosition = defaultAnchorPosition) {
      return renderTogglePopover(content, {
        elementName,
        buttonLabel,
        anchorPosition,
        linkStylesheet: copyStyleFile,
        // stylesheetPath: null,
        buttonIcon: true,
        hideButtonLabel: true
      });
    });
  }

  if (copyStyleFile) {
    /** @TODO */
    // eleventyConfig.addPassthroughCopy('images/*');
  }
}
