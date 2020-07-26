import { generateRandomClassname } from "../Utilities/ClassNameGenerator";

describe("ClassNameGenerator Tests", () => {
  test("Generates a (totally-not)random class name", () => {
    jest.spyOn(global.Date, "now").mockImplementationOnce(() => 1313131313);
    jest.spyOn(Math, "random").mockImplementationOnce(() => 0.5);

    const generatedString = generateRandomClassname("button");

    expect(generatedString).toEqual("button-6easw7qp");
  });

  test("Generates a static class name when overridden", () => {
    const generatedString = generateRandomClassname("button", "afterburn");

    expect(generatedString).toEqual("afterburn");
  });
});
