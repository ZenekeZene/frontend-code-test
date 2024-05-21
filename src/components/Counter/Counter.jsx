import React from 'react';
import { observer } from "mobx-react";
import { CounterFeed } from './CounterFeed';
import './Counter.css';

const Counter = observer(({ store }) => {
	const isAnyBoxSelected = store.isAnyBoxSelected();
  const numberOfBoxes = store.getNumberOfCreatedBoxes();

	const handleManualSelection = store.selectBox;

	return (
		<ul className="counter"
			aria-label={`There are ${numberOfBoxes} boxes`}
		>
			<CounterFeed
				boxes={store.boxes}
				isAnyBoxSelected={isAnyBoxSelected}
				onClick={handleManualSelection}
			/>
		</ul>
	);
});

export { Counter };
