import { getClassnames } from "../getClassnames";

describe("getClassnames function (utils):", () => {
  test(`should return a string with the
		classnames separated by a space`, () => {
    const classnames = ["box", "--is-selected", "--is-hovered"];
    const result = getClassnames(classnames);

    expect(result).toBe("box --is-selected --is-hovered");
  });

  test(`should return a string with the
		classnames separated by a space`, () => {
    const classnames = ["box", "--is-selected", false];
    const result = getClassnames(classnames);

    expect(result).toBe("box --is-selected");
  });
});
