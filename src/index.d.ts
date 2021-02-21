import React, { CSSProperties, ReactNode } from "react";
import { Tagname, StyleCollection } from "./Types";
export declare const StyledElement: (HTMLTag: Tagname, css: StyleCollection | CSSProperties, customCSS?: string | undefined, classOverride?: string | undefined) => React.FC;
declare type ThemeObject = {
    [key: string]: string;
};
declare type StyleWrapperProps = {
    Theme?: ThemeObject;
    children: ReactNode;
};
export declare const StyleWrapper: ({ Theme, children }: StyleWrapperProps) => JSX.Element;
export {};
