import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { SelectionCanvas } from "./SelectionCanvas";

const createNode = ({ id, top, left }) => {
	const node = document.createElement("div");
	node.id = id;
	node.getBoundingClientRect = () => ({
		left: top,
		top: left
	});
	return node;
};

const createNodes = (configNodes) => {
	const nodesMap = new Map();
	configNodes.forEach(configNode => {
		nodesMap.set(configNode.id, createNode(configNode));
	});
	return { current: nodesMap };
};

const simulateSelection = async (debugNode, { x, y }) => {
	fireEvent.mouseDown(debugNode);
	x && fireEvent.mouseMove(debugNode, { clientX: x, clientY: y });
	fireEvent.mouseUp(debugNode);
};

describe(`SelectionCanvas component:`, () => {
	test(`given two nodes, if the user makes a selection region
		only on a single node, the prop "onMouseUp" is called
		with the selected node`, () => {
		const onMouseUp = vi.fn();
		const boxesRef = createNodes([
			{ id: 'foo', top: 10, left: 20 },
			{ id: 'bar', top: 100, left: 90 },
		]);

		render(<SelectionCanvas
			boxesRef={boxesRef}
			onMouseUp={onMouseUp}
		/>);

		const selectionCanvas = screen.getByRole("group");
		simulateSelection(selectionCanvas, { x: 10, y: 20 });

		expect(onMouseUp).toHaveBeenCalledWith(["foo"]);
	});

	test(`given three nodes, if the user makes a selection region
		only on the first two, the prop "onMouseUp is called
		with these two selected nodes"`, () => {
		const onMouseUp = vi.fn();
		const boxesRef = createNodes([
			{ id: 'foo', top: 10, left: 20 },
			{ id: 'bar', top: 100, left: 90 },
			{ id: 'baz', top: 200, left: 190 },
		]);

		render(<SelectionCanvas
			boxesRef={boxesRef}
			onMouseUp={onMouseUp}
		/>);

		const selectionCanvas = screen.getByRole("group");
		simulateSelection(selectionCanvas, { x: 200, y: 90 });

		expect(onMouseUp).toHaveBeenCalledWith(["foo", "bar"]);
	});

	test(`given two nodes, if the user makes two selection region,
		the first time on the two, and then only on the first one,
		the prop "onMouseUp" is called with correct payload`, () => {
		const onMouseUp = vi.fn();
		const boxesRef = createNodes([
			{ id: 'foo', top: 10, left: 20 },
			{ id: 'bar', top: 100, left: 90 },
		]);

		render(<SelectionCanvas
			boxesRef={boxesRef}
			onMouseUp={onMouseUp}
		/>);

		const selectionCanvas = screen.getByRole("group");
		simulateSelection(selectionCanvas, { x: 200, y: 90 });
		simulateSelection(selectionCanvas, { x: 10, y: 20 });

		const calls = onMouseUp.mock.calls;
		expect(calls[0]).toEqual([["foo", "bar"]]);
		expect(calls[1]).toEqual([["foo"]]);
	});

	test(`given two nodes, it the user makes a selection region,
		but without passing over any node,
		the prop "onMouseUp" is called with empty payload `, () => {
		const onMouseUp = vi.fn();
		const boxesRef = createNodes([
			{ id: 'foo', top: 400, left: 200 },
			{ id: 'bar', top: 500, left: 100 },
		]);

		render(<SelectionCanvas
			boxesRef={boxesRef}
			onMouseUp={onMouseUp}
		/>);

		const selectionCanvas = screen.getByRole("group");
		simulateSelection(selectionCanvas, { x: 0, y: 0 });

		expect(onMouseUp).toHaveBeenCalledWith([]);
	});
});
