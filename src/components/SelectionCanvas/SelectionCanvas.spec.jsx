import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { SelectionCanvas } from "./SelectionCanvas";
import { getStoreMockedWithBoxes, createMockedBox } from "../../stores/__mocks__/MainStore.mock";

const mockNode = (box, rest) => {
  const node = document.createElement("div");
  node.getBoundingClientRect = () => (rest);
  box.setNode(node);
  return box;
};

const expectedSelectedNodes = (boxes, ids) =>
  boxes.filter((box) => ids.includes(box.id));

const simulateSelection = async (debugNode, { x, y }) => {
  fireEvent.mouseDown(debugNode, { clientX: 0, clientY: 0 });
  x && fireEvent.mouseMove(debugNode, { clientX: x, clientY: y });
  fireEvent.mouseUp(debugNode);
};

describe(`SelectionCanvas component:`, () => {
  test(`given three nodes, if the user makes a selection region
		only on the first two, the prop "onMouseUp is called
		with these two selected nodes"`, () => {
    const onMouseUp = vi.fn();
    const onMouseMove = vi.fn();
    const boxes = [
      mockNode(createMockedBox({ id: "foo" }), { top: 0, left: 0, right: 10, bottom: 10 }),
      mockNode(createMockedBox({ id: "bar" }), { top: 100, left: 90, right: 110, bottom: 110 }),
      mockNode(createMockedBox({ id: "baz" }), { top: 1000, left: 1000, right: 1010, bottom: 1010}),
    ];
    const store = getStoreMockedWithBoxes(boxes);
    const expected = expectedSelectedNodes(store.boxes, ["foo"]);

    render(
      <SelectionCanvas
        store={store}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
      />,
    );

    const selectionCanvas = screen.getByRole("group");
    simulateSelection(selectionCanvas, { x: 91, y: 101 });

    expect(onMouseUp).toHaveBeenCalledWith(expected);
  });
});
