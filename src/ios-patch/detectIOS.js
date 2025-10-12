/**
 * Detects if the browser is running on iOS
 * @returns {boolean} true if on iOS, false otherwise
 */
export function isIOS() {
  // Check if we're in a browser environment
  if (typeof window === "undefined" || typeof navigator === "undefined") {
    return false;
  }

  const ua = navigator.userAgent;

  // Check for iOS device (iPhone, iPad, iPod)
  const isIOSDevice = /iPad|iPhone|iPod/.test(ua) && !window.MSStream;

  return isIOSDevice;
}
