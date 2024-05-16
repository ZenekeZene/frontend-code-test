import React from 'react';
import { render, screen } from '@testing-library/react';
import { BoxSelectionTool } from './BoxSelectionTool';

describe('BoxSelectionTool component:', () => {
	test.each([
  [{ x: 10, y: 20 }, { x: 30, y: 40 }],
  [{ x: 30, y: 40 }, { x: 0, y: 0 }],
	[{ x: -10, y: -10 }, { x: 0, y: 0 }],
])(
  `Given the props "startCoordinates" and "endCoordinates",
  the component shows a box selection tool with the
  coordinates of the props`,
  (startCoordinates, endCoordinates) => {
    render(
      <BoxSelectionTool
        startCoordinates={startCoordinates}
        endCoordinates={endCoordinates}
      />
    );

    const boxSelectionTool = screen.getByLabelText('box selection tool');

    expect(boxSelectionTool).toHaveStyle(`
      width: ${Math.abs(endCoordinates.x - startCoordinates.x)}px;
      height: ${Math.abs(endCoordinates.y - startCoordinates.y)}px;
      left: ${Math.min(startCoordinates.x, endCoordinates.x)}px;
      top: ${Math.min(startCoordinates.y, endCoordinates.y)}px;
    `);
  }
);

	test(`If the props "startCoordinates" and "endCoordinates"
		are the same, the component is not rendered`, () => {
		render(
			<BoxSelectionTool
				startCoordinates={{ x: 10, y: 20 }}
				endCoordinates={{ x: 10, y: 20 }}
			/>
		);

		expect(() => screen.getByLabelText('box selection tool')).toThrow();
	});

	test(`If the props "startCoordinates" and "endCoordinates"
		are not passed, the component is not rendered`, () => {
		render(<BoxSelectionTool />);

		expect(() => screen.getByLabelText('box selection tool')).toThrow();
	});
});
