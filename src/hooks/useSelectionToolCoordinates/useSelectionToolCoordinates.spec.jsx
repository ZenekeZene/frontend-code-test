import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { useSelectionToolCoordinates } from "./useSelectionToolCoordinates";
import { test } from "vitest";

const DummyComponent = (props) => {
  const { coordinates, ...events } =
    useSelectionToolCoordinates(props);

  return (
    <p role="alert" {...events}>
      {JSON.stringify(coordinates)}
    </p>
  );
};

const simulateSelection = async (debugNode, { x, y }) => {
  fireEvent.mouseDown(debugNode);
  x && fireEvent.mouseMove(debugNode, { clientX: x, clientY: y });
  fireEvent.mouseUp(debugNode);
};

const dummyProps = {
  handleMouseDown: vi.fn(),
  handleMouseUp: vi.fn(),
  handleMouseMove: vi.fn(),
};

describe(`useSelectionToolCoordinates hook:
	the dummy component using the subject under test,
	`, () => {
  test(`has the coordinates as the default value by default`, () => {
    render(<DummyComponent {...dummyProps} />);

    const debugNode = screen.getByRole("alert");

    expect(debugNode).toHaveTextContent(
      '{"start":{"x":0,"y":0},"end":{"x":0,"y":0}}',
    );
  });

  test(`has the coordinates as the end coordinates when the user
		finishes selecting`, () => {
    render(<DummyComponent {...dummyProps} />);

    const debugNode = screen.getByRole("alert");
    simulateSelection(debugNode, { x: 10, y: 10 });

    expect(debugNode).toHaveTextContent(
      '{"start":{"x":0,"y":0},"end":{"x":10,"y":10}}',
    );
  });

  test(`given the prop "handleMouseUp", It is called
		when the user finishes selecting`, () => {
    const handleMouseUp = vi.fn();
    render(
      <DummyComponent
        handleMouseDown={vi.fn()}
        handleMouseMove={vi.fn()}
        handleMouseUp={handleMouseUp}
      />,
    );
    const debugNode = screen.getByRole("alert");

    simulateSelection(debugNode, { x: 20, y: 15 });

    expect(handleMouseUp).toHaveBeenCalled();
  });

  test(`given the prop "handleMouseMove", It is called
		when the user is moving the region of selection`, () => {
    const handleMouseMove = vi.fn();
    render(
      <DummyComponent
        handleMouseDown={vi.fn()}
        handleMouseMove={handleMouseMove}
        handleMouseUp={vi.fn()}
      />,
    );
    const debugNode = screen.getByRole("alert");

    simulateSelection(debugNode, { x: 20, y: 15 });

    expect(handleMouseMove).toHaveBeenCalled();
  });

  test(`given the prop "handleMouseDown", It is called
    when the user starts selecting`, () => {
    const handleMouseDown = vi.fn();
    render(
      <DummyComponent
        handleMouseDown={handleMouseDown}
        handleMouseMove={vi.fn()}
        handleMouseUp={vi.fn()}
      />,
    );
    const debugNode = screen.getByRole("alert");

    fireEvent.mouseDown(debugNode);

    expect(handleMouseDown).toHaveBeenCalled();
  });
});
