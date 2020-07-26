import React, { CSSProperties, useEffect } from "react";
import { Tagname, StyleCollection } from "./Types";
import { cssObjectToString, generateRandomClassname } from "./Utilities";

export const StyledElement = (
  HTMLTag: Tagname,
  css: StyleCollection | CSSProperties,
  customCSS?: string,
  classOverride?: string
): React.FC => {
  return props => {
    const className: string = generateRandomClassname(HTMLTag, classOverride);

    let styleTag: HTMLElement;

    useEffect(() => {
      styleTag = document.createElement("style");
      styleTag.innerText = cssObjectToString(className, css, customCSS || "");
      document.head.appendChild(styleTag);
      return () => {
        styleTag.remove();
      };
    }, []);

    return React.createElement(
      HTMLTag,
      { className: className },
      props.children
    );
  };
};
