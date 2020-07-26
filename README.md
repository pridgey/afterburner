# Afterburner ☄️

[![GitHub issues](https://img.shields.io/github/issues/pridgey/afterburner?label=Broken%20Stuff&style=flat-square)](https://github.com/pridgey/afterburner/issues)

Afterburner provides developers a library to create styled react components. Because it is written in Typescript, Afterburner takes advantage of type-safe CSS. By working hand-in-hand with React's CSSProperties Afterburner lessens the risk of silly typos. If you're familiar with other CSS-in-JS libraries like styled-components, then Afterburner will feel very comfortable.

To get started simply import StyledElement from Afterburner.

```jsx
import { StyledElement } from "afterburner";

const StyledButton = StyledElement("button", {
  backgroundColor: "#ffeeff",
  color: "#010101",
  border: "1px solid #010101",
  borderRadius: "6px",
  fontFamily: "sans-serif"
});

return <StyledButton>I'm a button!</StyledButton>;
```

Afterburner also allows the ability to specify CSS selectors such as `:hover` and `:focus`.

```jsx
import { StyledElement } from "afterburner";

const StyledButton = StyledElement("button", {
  standard: {
    backgroundColor: "#ffeeff",
    color: "#010101",
    border: "1px solid #010101",
    borderRadius: "6px",
    fontFamily: "sans-serif"
  },
  hover: {
    color: "#222222",
    border: "1px solid #222222"
  },
  focus: {
    border: "1px solid #222222"
  }
});

return <StyledButton>I'm a button!</StyledButton>;
```

Finally Afterburner allows for completely custom CSS as well:

```jsx
import { StyledElement } from "afterburner";

const StyledButton = StyledElement(
  "button",
  {
    backgroundColor: "#ffeeff",
    color: "#010101",
    border: "1px solid #010101",
    borderRadius: "6px",
    fontFamily: "sans-serif"
  },
  `.customClass { color: blue; font-family: cursive; }`
);

return <StyledButton>I'm a button!</StyledButton>;
```
