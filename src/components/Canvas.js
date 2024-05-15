import React from "react";

import { observer } from "mobx-react";
import Box from "./Box/Box";

export const canvasSize = {
  width: 800,
  height: 600
};

function Canvas({ store }) {
  return (
    <div className="canva" style={{ width: canvasSize.width, height: canvasSize.height }}>
      {store.boxes.map((box, index) => (
        <Box
          id={box.id}
          key={index}
          color={box.color}
          left={box.left}
          top={box.top}
          width={box.width}
          height={box.height}
          box={box}
          onClick={() => store.selectBox(box)}
        />
      ))}
    </div>
  );
}

export default observer(Canvas);
