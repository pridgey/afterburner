# Afterburner ☄️

[![GitHub issues](https://img.shields.io/github/issues/pridgey/afterburner?label=Broken%20Stuff&style=flat-square)](https://github.com/pridgey/afterburner/issues)

Afterburner provides developers a library to create styled react components. Because it is written in Typescript, Afterburner takes advantage of type-safe CSS. By working hand-in-hand with React's CSSProperties Afterburner lessens the risk of silly typos. If you're familiar with other CSS-in-JS libraries like styled-components, then Afterburner will feel very comfortable.

To get started simply import StyledElement from Afterburner and start writing some CSS:

```jsx
import { StyledElement } from "afterburner";

// StyledElement(tagName, CSSProperties)
const StyledButton = StyledElement("button", {
  backgroundColor: "#ffeeff",
  color: "#010101",
  border: "1px solid #010101",
  borderRadius: "6px",
  fontFamily: "sans-serif",
});

return <StyledButton>I'm a button!</StyledButton>;
```

Afterburner also allows the ability to specify CSS selectors such as `:hover` and `:focus`.

```jsx
import { StyledElement } from "afterburner";

// StyledElement(tagName, StyleCollection)
const StyledButton = StyledElement("button", {
  standard: {
    backgroundColor: "#ffeeff",
    color: "#010101",
    border: "1px solid #010101",
    borderRadius: "6px",
    fontFamily: "sans-serif",
  },
  hover: {
    color: "#222222",
    border: "1px solid #222222",
  },
  focus: {
    border: "1px solid #222222",
  },
});

return <StyledButton>I'm a button!</StyledButton>;
```

Afterburner also allows for completely custom CSS as well:

```jsx
import { StyledElement } from "afterburner";

// StyledElement(tagName, CSSProperties, customCSS)
const StyledButton = StyledElement(
  "button",
  {
    backgroundColor: "#ffeeff",
    color: "#010101",
    border: "1px solid #010101",
    borderRadius: "6px",
    fontFamily: "sans-serif",
  },
  `.customClass { color: blue; font-family: cursive; }`
);

return <StyledButton>I'm a button!</StyledButton>;
```

### Theming

So this is wonderful, but it really becomes powerful using themes. Afterburner's theme utilizes natural CSS Variables as a way to improve efficiency and not become reliant on things like constantly running javascript, or react context overhead. To utilize Afterburner theming, you simply need to wrap your App in `StyleWrapper`. If you do not provide a theme, Afterburner will use its default provided themes, Light or Dark, based on the users system preferences.

```jsx
/// index.jsx
ReactDOM.render(
  <React.StrictMode>
    <StyleWrapper>
      <App />
    <StyleWrapper>
  </React.StrictMode>,
  document.getElementById("root")
);
```

If you want to include your own theme, here is the place to do it. `StyleWrapper` accepts a `Theme` prop which is a simple object of keys and values. The keys will correlate to the variable names when you go to reference them. The values can be anything from colors, to fonts, to preset px/em's.

```jsx
/// index.jsx
ReactDOM.render(
  <React.StrictMode>
    <StyleWrapper
      Theme={{
        background: "#000",
        foreground: "#fff",
        blue: "#0000ff",
        green: "#00ff00",
        blue: "#ff0000",
        primaryFont: "'Noto Sans', sans-serif",
        theBorderRadius: "6px",
      }}>
      <App />
    <StyleWrapper>
  </React.StrictMode>,
  document.getElementById("root")
);
```

Then, later on when creating your components you can reference these variables in your CSS using the `--` notation:

```jsx
import { StyledElement } from "afterburner";

// StyledElement(tagName, CSSProperties)
const StyledButton = StyledElement("button", {
  backgroundColor: "--background",
  color: "--foreground",
  fontFamily: "--primaryFont",
  borderRadius: "--theBorderRadius",
});

return <StyledButton>I'm a button!</StyledButton>;
```

Furthermore, let's say your utilizing a color and want to step that color's shade up or down for something like a disabled button, or a simple hover effect. Afterburner can do that too! But only for your theme's variable colors. Doing so is simple, when using a variable in afterburner, add in a a number to step the shade up or down. Like so:

```jsx
import { StyledElement } from "afterburner";

// StyledElement(tagName, CSSProperties)
const StyledButton = StyledElement("button", {
  backgroundColor: "--background,-1", // Step this shade down by 1
  color: "--foreground,+2", // Step this shade up by 2
});

return <StyledButton>I'm a button!</StyledButton>;
```

### Cool, but why?

It's mostly just a fun project for me, but I'm also hoping to build a style library that can take theme colors and auto-adjust for contrast accessibility. There is a few things I'd like to achieve with this project. But it'll likely take incremental steps towards those goals.
