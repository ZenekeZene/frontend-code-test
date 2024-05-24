import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { SelectionCanvas } from "./SelectionCanvas";

const createNode = ({ id, ...rest }) => {
  const node = document.createElement("div");
  node.id = id;
  node.getBoundingClientRect = () => (rest);
  return node;
};

const createNodes = (configNodes) => {
  const nodes = [];
  configNodes.forEach((configNode) => {
    nodes.push({ node: createNode(configNode) });
  });
  return nodes;
};

const expectedSelectedNodes = (boxes, ids) => {
  return boxes.filter((box) => ids.includes(box.node.id));
};

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
    const boxes = createNodes([
      { id: "foo", top: 0, left: 0, right: 10, bottom: 10 },
      { id: "bar", top: 100, left: 90 },
      { id: "baz", top: 1000, left: 1000 },
    ]);
    const expected = expectedSelectedNodes(boxes, ["foo"]);

    render(
      <SelectionCanvas
        boxes={boxes}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
      />,
    );

    const selectionCanvas = screen.getByRole("group");
    simulateSelection(selectionCanvas, { x: 91, y: 101 });

    expect(onMouseUp).toHaveBeenCalledWith(expected);
  });
});
