import { safeUrl, safeToken, safeTagName, safeClassName } from './utilities.js';

/**
 * Core library function to render the `<toggle-popover>` custom element.
 */
export const coreDefaults = {
  elementName: 'toggle-popover',
  buttonLabel: 'Toggle menu',
  closeLabel: 'Close',
  anchorPosition: true,
  closeButton: true,
  linkStylesheet: true,
  stylesheetPath: '/css/toggle-popover.css',
  className: '',
  buttonIcon: false, // Or tokens: 'hamburger', etc. ??
  hideButtonLabel: false
};

export function togglePopover (htmlContent, options = {}) {
  const OPT = { ...coreDefaults, ...options };

  const {
    elementName, buttonLabel, closeLabel, closeButton, anchorPosition,
    buttonIcon, linkStylesheet, stylesheetPath, hideButtonLabel, className
  } = OPT;

  // const buttonText = stripHtml(buttonLabel);
  const tagName = safeTagName(elementName);
  const theClass = safeClassName(className);

  return `
<${tagName} class="${theClass}">
<template shadowrootmode="open">
  ${renderStylesheetLink(linkStylesheet, stylesheetPath)}
  <internal-root ${renderAttributes(anchorPosition, hideButtonLabel, buttonIcon)}>
  <button part="button" popovertarget="myID">
    <span part="buttonLabel">
      <slot name="buttonLabel">${buttonLabel}</slot>
    </span>
    ${renderButtonIcon(buttonIcon)}
  </button>
  <div part="popover" id="myID" popover>
    ${renderCloseButton(closeButton, closeLabel)}
    <slot>Popover content</slot>
  </div>
  </internal-root>
</template>
${htmlContent}
</${tagName}>
  `;
}

export function renderAttributes (anchorPosition, hideButtonLabel, buttonIcon) {
  const iconToken = buttonIcon ?? safeToken(buttonIcon);
  /* eslint-disable */
  return `${
    anchorPosition ? 'data-anchor-position' : '' } ${
    hideButtonLabel ? 'data-visually-hide' : ''} ${
    buttonIcon ? `data-button-icon="${iconToken}"` : ''
  }`;
  /* eslint-enable */
}

export function renderButtonIcon (buttonIcon) {
  return buttonIcon
    ? `
<span part="buttonIcon">
  <i part="hr"></i><i part="hr"></i><i part="hr"></i>
</span>`
    : '';
}

export function renderCloseButton (closeButton, closeLabel) {
  // const closeText = stripHtml(closeLabel);
  return closeButton
    ? `
  <button part="closeButton" popovertarget="myID">
    <span part="closeLabel">${closeLabel}</span>
  </button>`
    : '';
}

export function renderStylesheetLink (linkStylesheet, stylesheetPath) {
  const cleanCssPath = safeUrl(stylesheetPath);
  return linkStylesheet
    ? `<link rel="stylesheet" href="${cleanCssPath}">`
    : '';
}

/** @DEPRECATED */
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

export default togglePopover;
