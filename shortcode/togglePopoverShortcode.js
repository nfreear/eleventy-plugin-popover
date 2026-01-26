/**
 * Paired shortcode to create a `<toggle-popover>` custom element with declarative shadow DOM.
 *
 * @see https://www.11ty.dev/docs/shortcodes/#paired-shortcodes
 * @see https://web.dev/articles/declarative-shadow-dom#how_to_build_a_declarative_shadow_root
 * @see https://caniuse.com/declarative-shadow-dom
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Anchor_positioning
 */
export default function togglePopoverShortcode (eleventyConfig, options = {}) {
  const _DEFAULTS = {
    tpsShortcode: 'togglePopover',
    tpsElementName: 'toggle-popover',
    tpsDefaultButtonText: 'Toggle menu',
    tpsDefaultAnchor: true
  };

  const OPT = { ..._DEFAULTS, ...options };

  const shortcodeName = OPT.tpsShortcode;
  const tagName = OPT.tpsElementName;
  const defaultButtonText = OPT.tpsDefaultButtonText;
  const defaultAnchor = OPT.tpsDefaultAnchor;

  eleventyConfig.addPairedShortcode(shortcodeName, function (content, buttonLabel = defaultButtonText, anchor = defaultAnchor) {
    const buttonText = stripHtml(buttonLabel);

    return `
<${tagName}>
  <template shadowrootmode="open">
    <style>
      ${anchor ? stylesheet() : ''}
    </style>
    <button part="button" popovertarget="myID" aria-label="${buttonText}">
      <i part="buttonLine"></i>
      <i part="buttonLine"></i>
      <i part="buttonLine"></i>
      <span part="buttonLabel">
        <slot name="buttonLabel">Button label goes here</slot>
      </span>
    </button>
    <div part="popover" id="myID" popover>
      <slot name="popoverContent">Popover content goes here</slot>
    </div>
  </template>
  <span slot="buttonLabel">${buttonLabel}</span>
  <div slot="popoverContent">
    ${content}
  </div>
</${tagName}>
    `;
  });
}

export function stylesheet () {
  return `
@supports (position-anchor: --my-name) {
  button {
    anchor-name: --my-popover;
  }

  [ popover ] {
    margin-top: .1rem;
    /* position-anchor: --my-popover; */ /* Bug in Firefox 147?! */
    anchor-scope: --my-popover;
    position: fixed;
    position-area: bottom center;
  }
}
  `;
}

export function stripHtml (inputString) {
  return inputString.replace(/<[^>]*>?/gm, '');
}
