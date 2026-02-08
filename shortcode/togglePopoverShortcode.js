import renderTogglePopover from '../core/togglePopover.js';
import copyStyleAndScriptPlugin from './copyStylesheetPlugin.js';
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
  stylesheetPath: '/css/toggle-popover.shadow.css', // Path fixed!
  copyScriptFile: true,
  jsOutputDir: '/js',
  buttonIcon: false, // Or tokens: 'hamburger', etc. ??
  hideButtonLabel: false
};

export default function togglePopoverShortcode (eleventyConfig, options = {}) {
  const OPT = { ...shortcodeDefaults, ...options };

  const {
    shortcode, elementName, defaultButtonLabel, defaultAnchorPosition,
    hamburgerShortcode, copyStyleFile, cssOutputDir, stylesheetPath,
    copyScriptFile, jsOutputDir
  } = OPT;

  eleventyConfig.addPairedShortcode(shortcode, function (content, buttonLabel = defaultButtonLabel, className = '', anchorPosition = defaultAnchorPosition) {
    // console.log('ENV:', this.eleventy.env);

    return renderTogglePopover(content, {
      elementName,
      buttonLabel,
      anchorPosition,
      linkStylesheet: copyStyleFile,
      stylesheetPath,
      className,
    });
  });

  if (hamburgerShortcode) {
    eleventyConfig.addPairedShortcode(hamburgerShortcode, function (content, buttonLabel = defaultButtonLabel, className = '', anchorPosition = defaultAnchorPosition) {
      return renderTogglePopover(content, {
        elementName,
        buttonLabel,
        anchorPosition,
        linkStylesheet: copyStyleFile,
        stylesheetPath,
        className,
        buttonIcon: 'line',
        hideButtonLabel: true
      });
    });
  }

  copyStyleAndScriptPlugin(eleventyConfig, { copyStyleFile, cssOutputDir, copyScriptFile, jsOutputDir });
}
