import React, { useEffect } from "react";
import { generateRandomClassname, cssObjectToString } from "./Utilities";

type StyledElementProps = {
  children: React.ReactChild | React.ReactChild[];
  HTMLTag: string;
};

export const StyledElementComponent = (props: StyledElementProps) => {
  const className: string = generateRandomClassname(props.HTMLTag);

  let styleTag: HTMLElement;
  let Element = `${props.HTMLTag}`;
  useEffect(() => {
    styleTag = document.createElement("style");
    styleTag.innerText = "test";
    // styleTag.innerText = cssObjectToString(
    //     className,
    //     css,
    //     customCSS || ""
    //   );
    document.head.appendChild(styleTag);

    return () => {
      // Unmount? Remove.
      styleTag.remove();
    };
  }, []);

  return <Element>{props.children}</Element>;
};

{
  /* {
        React.createElement(
          props.HTMLTag,
          { className: className },
          props.children
        ) as React.FC
      } */
}
