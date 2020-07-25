import { CSSProperties } from "React";

export type StyleCollection = {
  standard: CSSProperties;
  [key: string]: CSSProperties;
};
