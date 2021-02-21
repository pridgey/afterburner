import React, { CSSProperties, useEffect, ReactNode } from "react";
import { Tagname, StyleCollection } from "./Types";
import {
  cssObjectToString,
  generateRandomClassname,
  themeObjectToCSS,
} from "./Utilities";

export const StyledElement = (
  HTMLTag: Tagname,
  css: StyleCollection | CSSProperties,
  customCSS?: string,
  classOverride?: string
): React.FC => {
  return (props) => {
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

type ThemeObject = {
  [key: string]: string;
};

type StyleWrapperProps = {
  Theme?: ThemeObject;
  children: ReactNode;
};

export const StyleWrapper = ({ Theme, children }: StyleWrapperProps) => (
  <div id="afterburner_sid" style={themeObjectToCSS(Theme)}>
    {children}
  </div>
);
