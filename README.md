# Afterburner

[![GitHub issues](https://img.shields.io/github/issues/pridgey/afterburner?label=Broken%20Stuff&style=flat-square)](https://github.com/pridgey/afterburner/issues)

Afterburner provides developers a library to create styled react components. Because it is written in Typescript, Afterburner takes advantage of type-safe CSS. By working hand-in-hand with React's CSSProperties Afterburner lessens the risk of silly typos. If you're familiar with other CSS-in-JS libraries like styled-components, then Afterburner will feel very comfortable.

To get started simply import StyledElement from Afterburner.

```
import StyledElement from "afterburner";

const StyledButton = StyledElement("button", {
    backgroundColor: "#ffeeff",
    color: "#010101,
    border: "1px solid #010101",
    borderRadius: "6px",
    fontFamily: "sans-serif",
});
```
