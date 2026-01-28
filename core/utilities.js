//
export function stripHtml (inputString) {
  return inputString.replace(/<[^>]*>?/gm, '').replace(/"/gm, '&quot;');
}

export function safeUrl (inputUrl) {
  if (!/^[\w_/.:-]$/.test(inputUrl)) {
    throw new Error(`Invalid inputUrl: ${inputUrl}`);
  }
  return inputUrl.replace(/[^\w_/.:-]/g, '');
}

export function safeToken (inputToken) {
  return inputToken === true ? 'true' : inputToken.replace(/[^a-z]/g, '');
}

export function safeTagName (inputTag) {
  if (!/^[a-z]+-[a-z]+$/.test(inputTag)) {
    throw new Error(`Invalid elementName: ${inputTag}`);
  }
  return inputTag;
}
