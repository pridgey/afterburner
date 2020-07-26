import { cssObjectToString } from "../Utilities/CSSConverter";

describe("CSSConverter Tests", () => {
  test("CSSConverter correctly converts CSS using CSSProperties", () => {
    const CSSString = cssObjectToString(
      "afterburn",
      {
        color: "green",
        fontFamily: "cursive",
        MozBorderRadius: "1"
      },
      ""
    );

    expect(CSSString).toEqual(
      ".afterburn{color:green;font-family:cursive;-moz-border-radius:1;}"
    );
  });

  test("CSSConverter correctly converts CSS using StyleCollection", () => {
    const CSSString = cssObjectToString(
      "afterburn",
      {
        standard: {
          backgroundColor: "red",
          fontSize: "5em"
        },
        hover: {
          textAlign: "left",
          display: "flex"
        },
        focus: {
          position: "absolute"
        }
      },
      ""
    );

    expect(CSSString).toEqual(
      ".afterburn{background-color:red;font-size:5em;}.afterburn:hover{text-align:left;display:flex;}.afterburn:focus{position:absolute;}"
    );
  });

  test("CSSConverter correctly converts CSS with custom CSS", () => {
    const CSSString = cssObjectToString(
      "afterburn",
      {
        fontWeight: 800
      },
      ".test{border:1px solid blue;}"
    );

    expect(CSSString).toEqual(
      ".test{border:1px solid blue;}.afterburn{font-weight:800;}"
    );
  });

  test("CSSConverter handles empty CSS object", () => {
    const CSSString = cssObjectToString("afterburn", {}, "");

    expect(CSSString).toEqual(".afterburn{}");
  });
});
