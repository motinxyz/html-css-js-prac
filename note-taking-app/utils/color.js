export function isColorDark(colorInHex) {
  if (colorInHex.length === 7) {
    colorInHex = colorInHex.replace("#", "");

    const r = parseInt(colorInHex.substring(0, 2), 16);
    const g = parseInt(colorInHex.substring(2, 4), 16);
    const b = parseInt(colorInHex.substring(4, 6), 16);

    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness < 128;
  } else {
    console.error("Invalid color code " + colorInHex);
  }
}