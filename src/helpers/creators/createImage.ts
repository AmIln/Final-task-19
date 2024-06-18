export function createImage(
  className: string,
  src: string,
  alt: string,
  width: number,
  height: number,
): HTMLImageElement {
  const image = document.createElement("img");
  image.classList.add(className);
  image.src = src;
  image.alt = alt;
  image.width = width;
  image.height = height;

  return image;
}
