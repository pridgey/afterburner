import { Hex, HSL, RGB } from "./../Types";
export declare const hexToRGB: (color: Hex) => RGB;
export declare const rgbToHSL: (color: RGB) => HSL;
export declare const hexToHSL: (color: Hex) => HSL;
export declare const isRGB: (color: string) => boolean;
export declare const isHex: (color: string) => boolean;
export declare const isHSL: (color: string) => boolean;
