import React from "react";
import { observer } from "mobx-react";
import { CounterFeed } from "./CounterFeed";
import "./Counter.css";

const Counter = observer(({ store }) => {
  const isAnyBoxSelected = store.isAnyBoxSelected();
  const numberOfBoxes = store.getNumberOfCreatedBoxes();
  const numberOfSelectedBoxes = store.getNumberOfSelectedBoxes();

  return (
    <section className="counter-wrapper">
      <ul className="counter" aria-label={`There are ${numberOfBoxes} boxes`}>
        <CounterFeed
          boxes={store.boxes}
          isAnyBoxSelected={isAnyBoxSelected}
          onClick={store.selectSingleBox}
        />
      </ul>
      {numberOfSelectedBoxes > 0 && (
        <span className="counter__value">({numberOfSelectedBoxes})</span>
      )}
    </section>
  );
});

export { Counter };
