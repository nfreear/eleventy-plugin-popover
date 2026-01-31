export default function cssPaths () {
  return {
    filename: 'toggle-popover.shadow.css',
    path: new URL('./toggle-popover.shadow.css', import.meta.url).pathname,
    type: 'text/css'
  };
}
