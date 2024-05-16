import React from "react";
import { observer } from "mobx-react";
import { useDraggable } from "./useDraggable";

const BoxDraggable = React.forwardRef((props, ref) => {
  const localRef = React.useRef();

  React.useImperativeHandle(ref, () => localRef.current);

  const { id, color, width, height, left, top, isSelected } = props.box;
  const initialCoordinates = { x: left, y: top };
  const { role, onClick, onDragEnd } = props;

  useDraggable({ ref: localRef, initialCoordinates, onDragEnd });

  const style = {
    backgroundColor: color,
    width: width,
    height: height,
    transform: `translate(${left}px, ${top}px)`,
    border: isSelected ? "2px solid #333" : "none"
  };

  return (
    <div
      ref={localRef}
      id={id}
      role={role}
      className="box"
      style={style}
      onClick={onClick}
    >
      {props.children}
    </div>
  );
});

export default observer(BoxDraggable);
