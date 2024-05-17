import React from "react";
import { observer } from "mobx-react";
import BoxDraggable from "../BoxDraggable/BoxDraggable";
import "./Box.css";

const Box = React.forwardRef((props, ref) => {
  const localRef = React.useRef();

  React.useImperativeHandle(ref, () => localRef.current);

  return (
    <BoxDraggable {...props} ref={localRef}>
      <div>Box</div>
    </BoxDraggable>
  );
});

export default observer(Box);
