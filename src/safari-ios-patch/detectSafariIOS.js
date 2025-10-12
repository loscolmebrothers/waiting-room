/**
 * Detects if the browser is Safari running on iOS
 * @returns {boolean} true if Safari on iOS, false otherwise
 */
export function isSafariIOS() {
  // Check if we're in a browser environment
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return false;
  }

  const ua = navigator.userAgent;

  // Check for iOS device
  const isIOS = /iPad|iPhone|iPod/.test(ua) && !window.MSStream;

  // Check for Safari (not Chrome, not Firefox, not other browsers on iOS)
  const isSafari = /Safari/.test(ua) && !/CriOS|FxiOS|OPiOS|mercury/.test(ua);

  return isIOS && isSafari;
}
