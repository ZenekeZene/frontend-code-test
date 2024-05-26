import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { useMultipleDraggable } from "./useMultipleDraggable";
import { DragService as DragServiceMock } from "../../services/__mocks__/drag.service.mock";
import { createBoxWithCustomNode } from "../../stores/models/createBox";

const simulateSelection = async (debugNode, { x, y }) => {
  fireEvent.mouseDown(debugNode, { clientX: 0, clientY: 0 });
  x && fireEvent.mouseMove(debugNode, { clientX: x, clientY: y });
  fireEvent.mouseUp(debugNode);
};

const DummyCanvas = (props) => {
  useMultipleDraggable(props);

  return <div aria-label="dummy-component" />;
};

describe("useMultipleDraggable hook:", () => {
  test(`Given zero boxes and a drag service,
		the hook does nothing`, () => {
    const boxesToDrag = [];
    const dragService = DragServiceMock;
    const onDragEnd = vi.fn();

    render(
      <DummyCanvas
        boxesToDrag={boxesToDrag}
        allBoxes={boxesToDrag}
        dragService={dragService}
        onDragEnd={onDragEnd}
      />,
    );

    expect(onDragEnd).not.toHaveBeenCalled();
  });

  test(`Given one box and a drag service, the box is draggable`, () => {
    const boxesToDrag = [createBoxWithCustomNode({ id: "foo" })];
    const dragService = DragServiceMock;
    const onDragEnd = vi.fn();

    render(
      <DummyCanvas
        boxesToDrag={boxesToDrag}
        allBoxes={boxesToDrag}
        dragService={dragService}
        onDragEnd={onDragEnd}
      />,
    );

    const boxElement = boxesToDrag[0].node;
    simulateSelection(boxElement, { x: 100, y: 150 });

    expect(boxElement.style.transform).toBe("translate(100px, 150px)");
  });

  test(`Given two boxes at the same position and a drag service,
		the boxes are draggable simultaneously`, () => {
    const boxesToDrag = [
      createBoxWithCustomNode({ id: "foo" }),
      createBoxWithCustomNode({ id: "bar" }),
    ];
    const dragService = DragServiceMock;
    const onDragEnd = vi.fn();

    render(
      <DummyCanvas
        boxesToDrag={boxesToDrag}
        allBoxes={boxesToDrag}
        dragService={dragService}
        onDragEnd={onDragEnd}
      />,
    );

    const [boxElement1, boxElement2] = boxesToDrag;
    const indifferentBoxElementForDragging = boxesToDrag[1].node;
    simulateSelection(indifferentBoxElementForDragging, { x: 100, y: 150 });

    expect(boxElement1.node.style.transform).toBe("translate(100px, 150px)");
    expect(boxElement2.node.style.transform).toBe("translate(100px, 150px)");

    simulateSelection(indifferentBoxElementForDragging, { x: 200, y: 250 });

    expect(boxElement1.node.style.transform).toBe("translate(300px, 400px)");
    expect(boxElement2.node.style.transform).toBe("translate(300px, 400px)");
  });

  test(`Given two boxes at different starting points and a drag service,
		the boxes are draggable simultaneously with relation
		of their starting points`, () => {
    const boxesToDrag = [
      createBoxWithCustomNode({ id: "foo", top: 0, left: 0 }),
      createBoxWithCustomNode({ id: "bar", top: 100, left: 200 }),
    ];
    const dragService = DragServiceMock;
    const onDragEnd = vi.fn();

    render(
      <DummyCanvas
        boxesToDrag={boxesToDrag}
        allBoxes={boxesToDrag}
        dragService={dragService}
        onDragEnd={onDragEnd}
      />,
    );

    const indifferentBoxElementForDragging = boxesToDrag[0].node;
    simulateSelection(indifferentBoxElementForDragging, { x: 100, y: 150 });

    expect(boxesToDrag[0].node.style.transform).toBe("translate(100px, 150px)");
    expect(boxesToDrag[1].node.style.transform).toBe("translate(300px, 250px)");
  });

  test(`Given four boxes at different starting points and a drag service
		and a drag end event callback, this callback is called four times
		when the dragging ends with their corresponding final coordinates as payload`, () => {
    const boxesToDrag = [
      createBoxWithCustomNode({ id: "foo", top: 0, left: 0 }),
      createBoxWithCustomNode({ id: "bar", top: 100, left: 200 }),
      createBoxWithCustomNode({ id: "baz", top: 200, left: 400 }),
      createBoxWithCustomNode({ id: "qux", top: 300, left: 600 }),
    ];
    const dragService = DragServiceMock;
    const onDragEnd = vi.fn();

    render(
      <DummyCanvas
        boxesToDrag={boxesToDrag}
        allBoxes={boxesToDrag}
        dragService={dragService}
        onDragEnd={onDragEnd}
      />,
    );

    const indifferentBoxElementForDragging = boxesToDrag[0].node;

    simulateSelection(indifferentBoxElementForDragging, { x: 100, y: 150 });

    expect(onDragEnd).toHaveBeenCalledTimes(4);
    expect(onDragEnd).toHaveBeenNthCalledWith(1, boxesToDrag[0], {
      x: 100,
      y: 150,
    });
    expect(onDragEnd).toHaveBeenNthCalledWith(2, boxesToDrag[1], {
      x: 300,
      y: 250,
    });
    expect(onDragEnd).toHaveBeenNthCalledWith(3, boxesToDrag[2], {
      x: 500,
      y: 350,
    });
    expect(onDragEnd).toHaveBeenNthCalledWith(4, boxesToDrag[3], {
      x: 700,
      y: 450,
    });
  });
});
