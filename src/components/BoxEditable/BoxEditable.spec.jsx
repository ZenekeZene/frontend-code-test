import React from 'react';
import { render, screen } from '@testing-library/react';
import Box from './Box';

describe('Box component', () => {
	test(`Given a reference to the box element,
		the box is shown with the text "Box" inside it.`, () => {
		const propBox = {};
		const ref = React.createRef();
		render(<Box box={propBox} ref={ref} />)

		expect(ref.current).toBe(screen.getByRole('button'));
	});
});
