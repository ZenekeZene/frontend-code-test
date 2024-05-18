import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useDraggable } from './useDraggable';
import { DragService as DragServiceMock } from '../../services/__mocks__/drag.service.mock';

const DummyComponent = (props) => {
	const ref = React.useRef();
	const initialCoordinates = { x: props.left, y: props.top };
	useDraggable({ ref, initialCoordinates, ...props });

	return (
		<div
			aria-label="dummy-component"
			ref={ref}
		></div>
	);
};

describe('useDraggable hook:', () => {
	test.skip(`Given initial coordinates,
		they are set in dataset of dummy component
		using subject under test`, () => {
		const props = {
			dragService: DragServiceMock,
			initialCoordinates: { x: 0, y: 0 },
			onDragEnd: vi.fn(),
		};
		render(<DummyComponent {...props} />);

		const dummyElement = screen.getByLabelText('dummy-component');

		expect(dummyElement.dataset.x).toBe("0");
		expect(dummyElement.dataset.y).toBe("0");
	});

	test.skip(`Given the user drags the dummy component
		using the subject under test,
		the dummy component is moved`, () => {
		const props = {
			dragService: DragServiceMock,
			initialCoordinates: { x: 0, y: 0 },
			onDragEnd: vi.fn(),
		};
		render(<DummyComponent {...props} />);

		const dummyElement = screen.getByLabelText('dummy-component');
		fireEvent.mouseDown(dummyElement, { clientX: 0, clientY: 0 });
		fireEvent.mouseMove(dummyElement, { clientX: 100, clientY: 150 });

		expect(dummyElement.style.transform).toBe("translate(100px, 150px)");
	});

	test.skip(`Given the user stops dragging the dummy component,
		the "onDragEnd" prop is called with the final coordinates`, () => {
		const onDragEnd = vi.fn();
		const props = {
			dragService: DragServiceMock,
			initialCoordinates: { x: 0, y: 0 },
			onDragEnd,
		};
		render(<DummyComponent {...props} />);

		const dummyElement = screen.getByLabelText('dummy-component');
		fireEvent.mouseDown(dummyElement, { clientX: 0, clientY: 0 });
		fireEvent.mouseMove(dummyElement, { clientX: 100, clientY: 150 });
		fireEvent.mouseUp(dummyElement);

		expect(onDragEnd).toHaveBeenCalledWith({ x: 100, y: 150 });
	});
});
