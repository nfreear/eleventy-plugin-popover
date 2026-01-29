
[![Node.js][ci-badge]][ci]

# eleventy-plugin-popover

A plugin for [Eleventy], that defines a paired [shortcode][] to create a `<toggle-popover>` custom element.

`eleventy.config.js`:
```js
import togglePopoverShortcode from 'eleventy-plugin-popover';

export default async function (eleventyConfig) {
  // …
  eleventyConfig.addPlugin(togglePopoverShortcode);
  // …
}
```

### Usage

In your [Liquid][] or [Nunjucks][] template:

```html
{% togglePopover 'Translations' %}
  <nav aria-label="Translations">
    <ul>
      <li><a href="english.html" lang="en">English</a>
      <li><a href="francais.html" lang="fr">Français</a>
      <li><a href="#…" lang="…">…</a>
    </ul>
  </nav>
{% endtogglePopover %}
```

## Used APIs

This server-side JavaScript library builds on the follow [Web APIs][]:

* [Autonomous custom elements][mdn:custom] ([Can I use? 96%][can-i:custom])
* [Declarative shadow DOM][declare] ([Can I use? 94%][can-i:declare])
* [Popover API][] ([Can I use? 88%][can-i:popover])
* [CSS Anchor Positioning][mdn:anchor] ([Can I use? 76%][can-i:anchor])

## Why?

1. The [Popover API][] provides a way to open and close a popup or menu using declarative HTML attributes. No client-side JavaScript is required.
2. [Anchor positioning][mdn:anchor] simplifies positioning one element in relation to another.
3. Both of the above require _uniqueness_ - unique `ID` values and unique CSS variables. [Declarative shadow DOM][declare] can provide uniqueness via encapsulation, without the need for client-side JavaScript.

## License

* License: [MIT][]

[mit]: https://nfreear.mit-license.org/#2026
[pen]: https://codepen.io/nfreear/pen/LEZOjbb
[eleventy]: https://www.11ty.dev/
[shortcode]: https://www.11ty.dev/docs/shortcodes/#paired-shortcodes
[liquid]: https://www.11ty.dev/docs/languages/liquid/
[nunjucks]: https://www.11ty.dev/docs/languages/nunjucks/

[declare]: https://web.dev/articles/declarative-shadow-dom#how_to_build_a_declarative_shadow_root
[mdn:anchor]: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Anchor_positioning
[mdn:custom]: https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements
[popover api]: https://developer.mozilla.org/en-US/docs/Web/API/Popover_API
[web apis]: https://developer.mozilla.org/en-US/docs/Web/API

[can-i:anchor]: https://caniuse.com/css-anchor-positioning "76.7%"
[can-i:custom]: https://caniuse.com/wf-autonomous-custom-elements "96%"
[can-i:declare]: https://caniuse.com/declarative-shadow-dom "94%"
[can-i:popover]: https://caniuse.com/wf-popover "88.7%"

[ci]: https://github.com/nfreear/eleventy-plugin-popover/actions/workflows/node.js.yml
[ci-badge]: https://github.com/nfreear/eleventy-plugin-popover/actions/workflows/node.js.yml/badge.svg
