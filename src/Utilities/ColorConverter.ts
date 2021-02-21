import { Hex, HSL, RGB } from "./../Types";

export const hexToRGB = (color: Hex): RGB => {
  // Parse each part of the string as radix 16
  const r = parseInt(color.substring(1, 3), 16);
  const g = parseInt(color.substring(3, 5), 16);
  const b = parseInt(color.substring(5, 7), 16);

  return { R: r, G: g, B: b };
};

export const rgbToHSL = (color: RGB): HSL => {
  let { R: r, G: g, B: b } = color;

  // Divide by 255 to get percentage value between 0 and 1
  r /= 255;
  g /= 255;
  b /= 255;

  let min = Math.min(r, g, b); // Max rgb value
  let max = Math.max(r, g, b); // Min rgb value
  let delta = max - min; // Difference between them
  let h = 0; // hue
  let s = 0; // saturation
  let l = 0; // lightness

  // Find the hue based on the greatest channel value, stored in max
  if (delta !== 0) {
    // Only do the following if the is a difference value
    if (max === r) {
      // Red is the max value
      h = ((g - b) / delta) % 6;
    } else if (max === g) {
      // Green is the max value
      h = (b - r) / delta + 2;
    } else {
      // Blue is max value
      h = (r - g) / delta + 4;
    }
  }

  // Finalize hue value
  h = Math.round(h * 60);

  // Account for negative hues
  if (h < 0) {
    h += 360;
  }

  // Lightness is half the max plus min
  l = (max + min) / 2;

  // Saturation depends on lightness
  if (delta !== 0) {
    s = delta / (1 - Math.abs(2 * l - 1));
  }

  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return { H: h, S: s, L: l };
};

export const hexToHSL = (color: Hex): HSL => rgbToHSL(hexToRGB(color));

export const isRGB = (color: string) => {
  const regex = new RegExp(/rgba?/);
  return regex.test(color);
};

export const isHex = (color: string) => {
  return (color.length === 7 || color.length === 4) && color.startsWith("#");
};

export const isHSL = (color: string) => {
  const regex = new RegExp(/hsla?/);
  return regex.test(color);
};
