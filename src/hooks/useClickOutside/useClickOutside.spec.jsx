import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { useClickOutside } from "./useClickOutside";

const DummyComponent = ({ onBlur }) => {
  useClickOutside({ onBlur });
  return <div>Dummy Component Text</div>;
};

describe("useClickOutside hook", () => {
  test(`if the user clicks on any element
		other than the document,
		the prop "onBlur" is not called`, () => {
    const onBlur = vi.fn();
    render(<DummyComponent onBlur={onBlur} />);
    const text = screen.getByText("Dummy Component Text");

    fireEvent.click(text);

    expect(onBlur).not.toHaveBeenCalled();
  });

  test(`if the user clicks on the document,
		the prop "onBlur" is called`, () => {
    const onBlur = vi.fn();
    render(<DummyComponent onBlur={onBlur} />);

    fireEvent.click(document);

    expect(onBlur).toHaveBeenCalled();
  });

  test(`if the user clicks on the document
		but the prop "onBlur" is not passed,
		the component is not crashed`, () => {
    render(<DummyComponent />);

    fireEvent.click(document);

    expect(() => screen.getByText("Dummy Component Text")).not.toThrow();
  });
});
