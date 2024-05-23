import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { SelectionCanvas } from "./SelectionCanvas";

const createNode = ({ id, top, left }) => {
  const node = document.createElement("div");
  node.id = id;
  node.getBoundingClientRect = () => ({
    top,
    left,
  });
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
  test(`given two nodes, if the user makes a selection region
		only on a single node, the prop "onMouseUp" is called
		with the selected node`, () => {
    const onMouseUp = vi.fn();
    const onMouseMove = vi.fn();
    const boxes = createNodes([
      { id: "foo", top: 0, left: 0 },
      { id: "bar", top: 100, left: 90 },
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
    simulateSelection(selectionCanvas, { x: 5, y: 6 });

    expect(onMouseUp).toHaveBeenCalledWith(expected);
  });

  test(`given three nodes, if the user makes a selection region
		only on the first two, the prop "onMouseUp is called
		with these two selected nodes"`, () => {
    const onMouseUp = vi.fn();
    const onMouseMove = vi.fn();
    const boxes = createNodes([
      { id: "foo", top: 0, left: 0 },
      { id: "bar", top: 100, left: 90 },
      { id: "baz", top: 1000, left: 1000 },
    ]);
    const expected = expectedSelectedNodes(boxes, ["foo", "bar"]);

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

  test(`given two nodes, if the user makes two selection region,
		the first time on the two, and then only on the first one,
		the prop "onMouseUp" is called with correct payload`, () => {
    const onMouseUp = vi.fn();
    const onMouseMove = vi.fn();
    const boxes = createNodes([
      { id: "foo", top: 0, left: 20 },
      { id: "bar", top: 100, left: 90 },
    ]);

    render(
      <SelectionCanvas
        boxes={boxes}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
      />,
    );

    const selectionCanvas = screen.getByRole("group");
    const expected = expectedSelectedNodes(boxes, ["foo", "bar"]);
    simulateSelection(selectionCanvas, { x: 91, y: 101 });

    const expectedTwo = expectedSelectedNodes(boxes, ["foo"]);
    simulateSelection(selectionCanvas, { x: 21, y: 15 });

    const calls = onMouseUp.mock.calls;
    expect(calls[0][0]).toEqual(expected);
    expect(calls[1][0]).toEqual(expectedTwo);
  });

  test(`given two nodes, it the user makes a selection region,
		but without passing over any node,
		the prop "onMouseUp" is called with empty payload `, () => {
    const onMouseUp = vi.fn();
    const onMouseMove = vi.fn();
    const boxes = createNodes([
      { id: "foo", top: 400, left: 200 },
      { id: "bar", top: 500, left: 100 },
    ]);

    render(
      <SelectionCanvas
        boxes={boxes}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
      />,
    );

    const selectionCanvas = screen.getByRole("group");
    simulateSelection(selectionCanvas, { x: 0, y: 0 });

    expect(onMouseUp).toHaveBeenCalledWith([]);
  });

  test(`given two nodes, if the user makes a selection region,
		and then moves the mouse over the nodes,
		the prop "onMouseMove" is called with the selected nodes`, () => {
    const onMouseUp = vi.fn();
    const onMouseMove = vi.fn();
    const boxes = createNodes([
      { id: "foo", top: 0, left: 0 },
      { id: "bar", top: 100, left: 90 },
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
    simulateSelection(selectionCanvas, { x: 5, y: 6 });

    expect(onMouseMove).toHaveBeenCalledWith(expected);
  });
});
