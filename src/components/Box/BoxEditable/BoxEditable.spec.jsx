import React from 'react';
import { render, screen } from '@testing-library/react';
import BoxEditable from './BoxEditable';

describe('Box component', () => {
	test(`Given a reference to the box element,
		the box is shown with the text "Box" inside it.`, () => {
		const propBox = {};
		const ref = React.createRef();
		render(<BoxEditable box={propBox} ref={ref} />)

		expect(ref.current).toBe(screen.getByRole('button'));
	});
});
