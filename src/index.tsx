import React, { CSSProperties } from "react";
import ReactDOM from "react-dom";
import { Tagname, StyleCollection } from "./Types";
import { cssObjectToString, generateRandomClassname } from "./Utilities";

export const StyledElement = (
  HTMLTag: Tagname,
  css: StyleCollection | CSSProperties,
  customCSS?: string
): React.FC => {
  return props => {
    const className: string = generateRandomClassname(HTMLTag);

    const styleElement = document.createElement("style");
    styleElement.innerText = cssObjectToString(className, css, customCSS || ""); // This appends a new style tag every render, which is... not so good
    document.head.appendChild(styleElement);
    return React.createElement(
      HTMLTag,
      { className: className },
      props.children
    );
  };
};
