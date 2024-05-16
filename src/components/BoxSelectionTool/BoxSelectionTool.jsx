import React from 'react';
import './BoxSelectionTool.css';

const BoxSelectionTool = React.forwardRef(({ startCoordinates, endCoordinates }, ref) => {
	const directionX = startCoordinates.x < endCoordinates.x ? 1 : -1;
	const directionY = startCoordinates.y < endCoordinates.y ? 1 : -1;

	const style = {
		width: Math.abs(endCoordinates.x - startCoordinates.x),
		height: Math.abs(endCoordinates.y - startCoordinates.y),
		left: directionX === -1 ? endCoordinates.x : startCoordinates.x,
		top: directionY === -1 ? endCoordinates.y : startCoordinates.y,
	};

	return (
		<div
			ref={ref}
			style={style}
			className="box-selection-tool"
		>
		</div>
	);
});

export { BoxSelectionTool };
