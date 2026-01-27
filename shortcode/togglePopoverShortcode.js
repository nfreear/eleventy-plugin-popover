import renderTogglePopover from '../core/togglePopover.js';

/**
 * Paired shortcode to create a `<toggle-popover>` custom element with declarative shadow DOM.
 *
 * @see https://www.11ty.dev/docs/shortcodes/#paired-shortcodes
 */
export default function togglePopoverShortcode (eleventyConfig, options = {}) {
  const _DEFAULTS = {
    shortcode: 'togglePopover',
    elementName: 'toggle-popover',
    defaultButtonLabel: 'Toggle menu',
    defaultAnchorPosition: true
  };

  const OPT = { ..._DEFAULTS, ...options };

  const { shortcode, elementName, defaultButtonLabel, defaultAnchorPosition } = OPT;

  eleventyConfig.addPairedShortcode(shortcode, function (content, buttonLabel = defaultButtonLabel, anchorPosition = defaultAnchorPosition) {
    return renderTogglePopover(content, {
      elementName,
      buttonLabel,
      anchorPosition
    });
  });
}
