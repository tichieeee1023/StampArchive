// Match the stage's centered object-fit: cover, then capture 190 CSS pixels.
// Store original stage dimensions on each stamp so resizing never changes its crop.
export function getStampCrop(stamp, inner = 11) {
  const { stageWidth, stageHeight, imageWidth, imageHeight, x, y } = stamp;
  const coverScale = Math.max(stageWidth / imageWidth, stageHeight / imageHeight);
  const renderedWidth = imageWidth * coverScale;
  const renderedHeight = imageHeight * coverScale;
  const scale = (120 - inner * 2) / 190;
  return {
    x: 60 - (x - (stageWidth - renderedWidth) / 2) * scale,
    y: 80 - (y - (stageHeight - renderedHeight) / 2) * scale,
    width: renderedWidth * scale,
    height: renderedHeight * scale,
  };
}
