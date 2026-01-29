export default function cssPaths () {
  return {
    filename: 'toggle-popover.css',
    path: new URL('./toggle-popover.css', import.meta.url).pathname,
    type: 'text/css'
  };
}
