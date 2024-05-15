import React from "react";
import { observer } from "mobx-react";
import { useDraggable } from "./useDraggable";
import { useClickOutside } from "../../hooks/useClickOutside";

const BoxDraggable = (props) => {
  const { id, color, width, height, left, top, isSelected } = props;
  const initialCoordinates = { x: left, y: top };
  const { onClick, onClickOutside, onDragEnd } = props;
  const boxRef = useClickOutside({ onClickOutside });

  useDraggable({ boxRef, initialCoordinates, onDragEnd });

  const style = {
    backgroundColor: color,
    width: width,
    height: height,
    transform: `translate(${left}px, ${top}px)`,
    border: isSelected ? "2px solid #333" : "none"
  };

  return (
    <div
      ref={boxRef}
      id={id}
      className="box"
      style={style}
      onClick={onClick}
    >
      {props.children}
    </div>
  );
}

export default observer(BoxDraggable);
