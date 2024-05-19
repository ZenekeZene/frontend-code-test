import React from "react";
import { observer } from "mobx-react";
import { IconDelete } from "../../icons/IconDelete";
import BoxDraggable from "../BoxDraggable/BoxDraggable";
import "./Box.css";

const Box = React.forwardRef((props, ref) => {
  const localRef = React.useRef();

  React.useImperativeHandle(ref, () => localRef.current);

  return (
    <BoxDraggable {...props} ref={localRef}>
      { !props.areMultipleBoxesSelected && (
        <span className="box__remove" onClick={props.onRemove}>
          <IconDelete />
        </span>
      )}
      <div>Box</div>
    </BoxDraggable>
  );
});

export default observer(Box);
