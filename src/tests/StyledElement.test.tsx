import { StyledElement } from "../index";
import { render } from "@testing-library/react";
import React from "react";

describe("Test StyledElement", () => {
  test("StyledElement returns a renderable component", () => {
    const Component = StyledElement(
      "button",
      { color: "blue" },
      "",
      "afterburn"
    );

    const { container, unmount } = render(<Component />);

    expect(container).toMatchSnapshot();
    unmount();
  });
});
