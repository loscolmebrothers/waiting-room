export function isIOS() {
  if (typeof window === "undefined" || typeof navigator === "undefined") {
    return false;
  }

  const ua = navigator.userAgent;

  const isIOSDevice = /iPhone|iPod/.test(ua) && !window.MSStream;

  return isIOSDevice;
}
