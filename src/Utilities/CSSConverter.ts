import { CSSProperties } from "react";
import { StyleCollection } from "./../Types";

export const cssObjectToString = (
  className: string,
  css: StyleCollection | CSSProperties,
  customCSS: string
) => {
  let cssString = "" + customCSS;

  if ("standard" in css) {
    // css is a StyleCollection
    const collections = Object.values(css);
    Object.keys(css).forEach((key: string, index: number) => {
      cssString += `.${className}${
        key === "standard" ? "" : `:${key}`
      }{${cssPropertiesToString(collections[index])}}`;
    });
  } else {
    // css is a CSSProperties
    cssString += `.${className}{${cssPropertiesToString(
      css as CSSProperties
    )}}`;
  }

  return cssString;
};

const cssPropertiesToString = (css: CSSProperties) => {
  const cssResults: string[] = [];

  const cssValues = Object.values(css);

  Object.keys(css).forEach((key: string, index: number) => {
    // CSS Key
    cssResults.push(`${cssKeyToProperString(key)}: `);
    // CSS Value
    cssResults.push(`${checkCSSValueForVariable(cssValues[index])};`);
  });

  return cssResults.join("");
};

const cssKeyToProperString = (key: string) => {
  // Split the key by uppercase characters
  // So a key like backgroundColor becomes ["background", "Color"]
  const keyParts: string[] | undefined = key
    .match(/([A-Z]?[^A-Z]*)/g)
    ?.slice(0, -1);

  if (!!keyParts && keyParts?.length > 1) {
    // Grab the first part of the key
    const firstPart = keyParts[0].toLowerCase();
    if (
      firstPart === "webkit" ||
      firstPart === "khtml" ||
      firstPart === "moz" ||
      firstPart === "o"
    ) {
      // The first part of the key is a browser-specific identifier
      // So we need to add - to the front of them
      keyParts[0] = `-${keyParts[0]}`;
    }
    // return the combined key with - so "backgroundColor" becomes "background-color"
    return keyParts.join("-").toLowerCase();
  } else {
    // We either have just one string, like ["display"]
    // Or we have nothing.
    // Either way, return what's here
    return keyParts?.join("").toLowerCase() ?? "";
  }
};

const checkCSSValueForVariable = (value: string) => {
  if (!value.includes("--")) {
    // No variable to parse
    return value;
  } else {
    // Do we need to modify the value?
    if (value.includes(",+") || value.includes(",-")) {
      // We need to raise / drop the shade
      const parts = value.split(",");
      const steps = Number(parts[1]);

      // Get the element defining the css vars
      const afterburnerStyleElement = document.getElementById(
        "afterburner_sid"
      );

      if (!afterburnerStyleElement) {
        // Can't find that element, something went wrong.
        return "var(--foreground)";
      } else {
        // Grab the value from the style element
        const cssVarValue = getComputedStyle(
          afterburnerStyleElement
        ).getPropertyValue(parts[0]);

        console.log("var val:", cssVarValue);

        // This should be HSL, because all our CSS colors are
        const numbers = cssVarValue
          .split("(")[1]
          .replace(")", "")
          .replaceAll("%", "")
          .split(",");

        return `hsl(${numbers[0]}, ${numbers[1]}%, ${
          Number(numbers[2]) + steps * 5
        }%)`;
      }
    } else {
      // No shade stepping, just simple variable
      return `var(${value})`;
    }
  }
};
