import React, {
  CSSProperties,
  useEffect,
  ReactNode,
  createElement,
  ReactHTML,
  HTMLAttributes,
  DetailedHTMLProps,
} from "react";
import { StyleCollection } from "./Types";
import {
  cssObjectToString,
  generateRandomClassname,
  themeObjectToCSS,
} from "./Utilities";

export const StyledElement = (
  HTMLTag: keyof ReactHTML,
  css: StyleCollection | CSSProperties,
  customCSS?: string,
  classOverride?: string
): React.FunctionComponent<
  DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
> => {
  return (props: any) => {
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

    return createElement(
      HTMLTag,
      { className: className, ...props },
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
