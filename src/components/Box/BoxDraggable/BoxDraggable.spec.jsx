import React from "react";
import { render, screen } from "@testing-library/react";
import BoxDraggable from "./BoxDraggable";

const createBoxProp = (props) => ({
  id: "box-id",
  color: "black",
  width: 10,
  height: 20,
  left: 30,
  top: 40,
  ...props,
});

describe("BoxDraggable component:", () => {
  test(`Given the prop "isSelected" is true,
		the box is selected.`, () => {
    const propBox = createBoxProp({
      isSelected: true,
    });
    const { rerender } = render(<BoxDraggable box={propBox} />);

    const boxElement = screen.getByRole("button");
    expect(boxElement).toHaveAttribute("aria-pressed", "true");

    rerender(<BoxDraggable box={createBoxProp({ isSelected: false })} />);
    expect(boxElement).toHaveAttribute("aria-pressed", "false");
  });

  test(`Given the props related to visual
		properties of a box, a box is shown to
		the user with this properties of style`, () => {
    const propBox = {
      id: "box-id",
      color: "black",
      width: 10,
      height: 20,
      left: 30,
      top: 40,
    };
    render(<BoxDraggable box={propBox} />);

    const boxElement = screen.getByRole("button");

    expect(boxElement).toHaveStyle(`
			minWidth: 10px;
			minHeight: 20px;
			transform: translate(30px, 40px);
		`);
    expect(boxElement).not.toHaveStyle(`border: 2px solid #333;`);
  });
});
