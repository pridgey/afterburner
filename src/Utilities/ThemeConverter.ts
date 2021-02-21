import { ThemeObject } from "./../Types";
import { DarkTheme, LightTheme } from "./../Themes";
import { isHSL, isHex, isRGB, hexToHSL, rgbToHSL } from "./../Utilities";

export const themeObjectToCSS = (Theme?: ThemeObject) => {
  let workingTheme: ThemeObject | undefined = Theme;
  let resultingTheme = {};

  if (!Theme) {
    // No given theme, default to library theme
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      workingTheme = DarkTheme;
    } else {
      workingTheme = LightTheme;
    }
  }

  // Convert theme keys to css variables
  const keys = Object.keys(workingTheme!);
  const values = Object.values(workingTheme!);

  keys.forEach((key: string, index: number) => {
    Object.assign(resultingTheme, {
      [`--${key}`]: setColorToHSL(values[index]),
    });
  });

  return resultingTheme;
};

const setColorToHSL = (value: string) => {
  if (isHSL(value)) {
    return value;
  }

  if (isHex(value)) {
    console.log("It's hex!");
    const { H, S, L } = hexToHSL(value);
    console.log("HSL:", { H, S, L });
    return `hsl(${H}, ${S}%, ${L}%)`;
  }

  if (isRGB(value)) {
    const numbers = value.split("(")[1].replace(")", "").split(",");
    const { H, S, L } = rgbToHSL({
      R: Number(numbers[0]),
      G: Number(numbers[1]),
      B: Number(numbers[2]),
    });

    return `hsl(${H}, ${S}%, ${L}%)`;
  }

  // Doesn't look like a color, so leave it as is
  return value;
};
