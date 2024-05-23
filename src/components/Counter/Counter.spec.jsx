import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import store from '../../stores/MainStore';
import { createBox } from "../../stores/models/createBox";
import { Counter } from './Counter';

beforeEach(() => {
	store.removeAllBoxes();
});

afterEach(() => {
	store.removeAllBoxes();
});

describe('Counter component:', () => {
	test('should render the counter with two boxes', () => {
    store.addBox(createBox());
    store.addBox(createBox());

		render(<Counter store={store} />);

		const counter = screen.getByRole('list', { name: /2 boxes/i });
		expect(counter).toBeInTheDocument();
	});

	test('should render the counter with no boxes', () => {
		render(<Counter store={store} />);

		const counter = screen.queryByRole('list', { name: /0 boxes/i });
		expect(counter).toBeInTheDocument();
	});

	test('should render the boxes with his respective background color', () => {
		store.addBox(createBox({ backgroundColor: 'red' }));
		store.addBox(createBox({ backgroundColor: 'blue' }));
		render(<Counter store={store} />);

		const boxes = screen.getAllByRole('button');
		expect(boxes).toHaveLength(2);

		const firstBox = boxes[0];
		const secondBox = boxes[1];

		expect(firstBox).toHaveStyle({ backgroundColor: 'red' });
		expect(secondBox).toHaveStyle({ backgroundColor: 'blue' });
	});

	test(`should render as selected box if the user
		clicks on it`, async () => {
		const user = userEvent.setup();
		store.addBox(createBox());
		render(<Counter store={store} />);

		const box = screen.getByRole('button');
		await user.click(box);

		expect(box).toHaveClass('--is-selected');
	});
});
