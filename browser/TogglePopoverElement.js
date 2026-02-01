const { customElements, HTMLElement } = window;

/**
 * Optional custom element class, to set a flag when popover is toggled.
 *
 * @customElement toggle-popover
 */
export class TogglePopoverElement extends HTMLElement {
  #buttonElem;
  #popoverElem;

  connectedCallback () {
    console.assert(this.shadowRoot, 'shadowRoot missing');

    this.#tempFixStylesheetPath();

    this.#buttonElem = this.shadowRoot.querySelector('button');
    this.#popoverElem = this.shadowRoot.querySelector('[ popover ]');

    this.#popoverElem.addEventListener('toggle', (ev) => this.#toggleHandler(ev));

    console.debug('<toggle-popover>', this.shadowRoot, [this]);
  }

  #toggleHandler (ev) {
    const partAttr = (ev.newState === 'open') ? 'button buttonOpen' : 'button';

    this.#buttonElem.setAttribute('part', partAttr);

    console.debug('toggle:', partAttr, ev);
  }

  #tempFixStylesheetPath () {
    const linkElem = this.shadowRoot.querySelector('link[ rel = stylesheet ]');
    console.assert(linkElem, '<link> element not found in shadowRoot.');

    const href = linkElem.getAttribute('href');
    console.debug('Fix <link rel=stylesheet>:', href);
    linkElem.setAttribute('href', href.replace(/^\//, './'));
  }
}

export default function defineTogglePopoverElement () {
  customElements.define('toggle-popover', TogglePopoverElement);
}
