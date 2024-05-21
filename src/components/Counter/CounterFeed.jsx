import React from 'react';

const CounterFeed = ({ boxes, isAnyBoxSelected, onClick }) => {
	const style = (box) => {
		return ({
			backgroundColor: box.backgroundColor,
			opacity: box.isSelected ? 1 : !isAnyBoxSelected ? 1 : 0.5,
		});
	};

	if (!boxes.length) return null;

	return (<>
		{ boxes.map((box, index) => (
			<li key={`box-${index}`}
				className={`counter__item ${box.isSelected ? '--is-selected': ''}`}
				role="button"
				style={style(box)}
				onClick={() => onClick(box)}
				onMouseOver={() => box.setHovered(true)}
				onMouseLeave={() => box.setHovered(false)}
			></li>
		))}
	</>);
};

export { CounterFeed };
