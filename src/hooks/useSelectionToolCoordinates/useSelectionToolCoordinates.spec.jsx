import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { useSelectionToolCoordinates } from "./useSelectionToolCoordinates";
import { test } from "vitest";

const DummyComponent = (props) => {
  const { isSelecting, coordinates, ...events } =
    useSelectionToolCoordinates(props);

  return (
    <p role="alert" aria-pressed={isSelecting} {...events}>
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
  handleMouseUp: vi.fn(),
  handleMouseMove: vi.fn(),
};

describe(`useSelectionToolCoordinates hook:
	the dummy component using the subject under test,
	`, () => {
  describe('has "aria-pressed" attribute ', () => {
    test(`as false by default`, () => {
      render(<DummyComponent {...dummyProps} />);

      const debugNode = screen.getByRole("alert");

      expect(debugNode).toHaveAttribute("aria-pressed", "false");
    });

    test(`as true when the user starts selecting`, () => {
      render(<DummyComponent {...dummyProps} />);

      const debugNode = screen.getByRole("alert");
      fireEvent.mouseDown(debugNode);

      expect(debugNode).toHaveAttribute("aria-pressed", "true");
    });

    test(`as false when the user finishes selecting`, () => {
      render(<DummyComponent {...dummyProps} />);

      const debugNode = screen.getByRole("alert");
      simulateSelection(debugNode, { x: 10, y: 10 });

      expect(debugNode).toHaveAttribute("aria-pressed", "false");
    });
  });

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
		with the final coordinates when the user finishes selecting`, () => {
    const handleMouseUp = vi.fn();
    render(
      <DummyComponent
        handleMouseUp={handleMouseUp}
        handleMouseMove={vi.fn()}
      />,
    );
    const debugNode = screen.getByRole("alert");

    simulateSelection(debugNode, { x: 20, y: 15 });

    expect(handleMouseUp).toHaveBeenCalledWith(
      expect.objectContaining({ end: { x: 20, y: 15 } }),
    );
  });

  test(`given the prop "handleMouseMove", It is called
		with the coordinates when the user is moving the
		region of selection`, () => {
    const handleMouseMove = vi.fn();
    render(
      <DummyComponent
        handleMouseUp={vi.fn()}
        handleMouseMove={handleMouseMove}
      />,
    );
    const debugNode = screen.getByRole("alert");

    simulateSelection(debugNode, { x: 20, y: 15 });

    expect(handleMouseMove).toHaveBeenCalledWith(
      expect.objectContaining({ end: { x: 20, y: 15 } }),
    );
  });
});
