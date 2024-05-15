import React from "react";
import { observer } from "mobx-react";

function BoxDraggable(props) {
  return (
    <div
      id={props.id}
      className="box"
      style={{
        backgroundColor: props.color,
        width: props.width,
        height: props.height,
        transform: `translate(${props.left}px, ${props.top}px)`,
        border: props.box.isSelected ? "2px solid #333" : "none"
      }}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
}

export default observer(BoxDraggable);
