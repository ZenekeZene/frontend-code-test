import React from 'react';
import { render, screen } from '@testing-library/react';
import Box from './Box';

const createBoxProp = (props) => ({
	id: 'box-id',
	color: 'black',
	width: 10,
	height: 20,
	left: 30,
	top: 40,
	...props,
});

describe('Box component', () => {
	test(`Given the props related to visual
		properties of a box, a box is shown to
		the user with this properties of style`, () => {
		const propBox = createBoxProp({
			width: 10,
			height: 20,
			left: 30,
			top: 40,
		});
		render(<Box box={propBox} />)

		const boxElement = screen.getByRole('group');

		expect(boxElement).toHaveStyle(`
			width: 10px;
			height: 20px;
			transform: translate(30px, 40px);
		`);
		expect(boxElement).not.toHaveStyle(`border: 2px solid #333;`);
	});

	test(`Given the prop "isSelected" is true,
		the box is shown with a border.`, () => {
		const propBox = createBoxProp({
			isSelected: true,
		});
		render(<Box box={propBox} />)

		const boxElement = screen.getByRole('group');

		expect(boxElement).toHaveStyle(`border: 2px solid #333;`);
	});

	test(`Given the prop "isSelected" is false,
		the box is shown without a border.`, () => {
		const propBox = createBoxProp({
			isSelected: false,
		});
		render(<Box box={propBox} />)

		const boxElement = screen.getByRole('group');

		expect(boxElement).not.toHaveStyle(`border: 2px solid #333;`);
	});

	test(`Given a reference to the box element,
		the box is shown with the text "Box" inside it.`, () => {
		const propBox = createBoxProp({});
		const ref = React.createRef();
		render(<Box box={propBox} ref={ref} />)

		expect(ref.current).toBe(screen.getByRole('group'));
	});
});
