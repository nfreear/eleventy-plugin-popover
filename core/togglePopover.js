//
export const _defaults = {
  elementName: 'toggle-popover',
  buttonLabel: 'Toggle menu',
  closeLabel: 'Close',
  anchorPosition: true
};

export function togglePopover (htmlContent, options = {}) {
  const OPT = { ..._defaults, ...options };

  const { elementName, buttonLabel, closeLabel, anchorPosition } = OPT;
  const buttonText = stripHtml(buttonLabel);
  const closeText = stripHtml(closeLabel);

  return `
<${elementName}>
<template shadowrootmode="open">
  <style>
    ${anchorPosition ? stylesheet() : ''}
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
    <button part="closeButton" popovertarget="myID" aria-label="${closeText}">
      <span part="closeLabel">
        <slot name="closeLabel"></slot>
      </span>
    </button>
    <slot name="popoverContent">Popover content goes here</slot>
  </div>
</template>
<span slot="buttonLabel">${buttonLabel}</span>
<span slot="closeLabel">${closeLabel}</span>
<div slot="popoverContent">
  ${htmlContent}
</div>
</${elementName}>
  `;
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

export default togglePopover;
