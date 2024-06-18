export function isProductPage(url?: string): boolean {
  const hash = window.location.hash;
  if (url) {
    if (url.includes("ritter-sport")) {
      return true;
    }
    return false;
  }

  if (hash.length != 0) {
    if (hash.includes("ritter-sport")) {
      return true;
    }
  }
  return false;
}
