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
    cssResults.push(`${cssKeyToProperString(key)}:`);
    // CSS Value
    cssResults.push(`${cssValues[index]};`);
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
