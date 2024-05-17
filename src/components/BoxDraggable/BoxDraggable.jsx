import React from "react";
import { observer } from "mobx-react";
import { useDraggable } from "../../hooks/useDraggable/useDraggable";
import { DragService } from '../../services/drag.service';

const BoxDraggable = React.forwardRef((props, ref) => {
  const localRef = React.useRef();

  React.useImperativeHandle(ref, () => localRef.current);

  const { id, color, width, height, left, top, isSelected } = props.box;
  const initialCoordinates = { x: left, y: top };
  const { onClick, onDragEnd } = props;

  useDraggable({ ref: localRef, dragService: DragService, initialCoordinates, onDragEnd });

  const style = {
    backgroundColor: color,
    width: width,
    height: height,
    transform: `translate(${left}px, ${top}px)`,
  };

  return (
    <div
      ref={localRef}
      id={id}
      role="button"
      className={ `box ${isSelected ? '--is-selected': '' }` }
      aria-pressed={isSelected}
      style={style}
      onClick={onClick}
    >
      {props.children}
    </div>
  );
});

export default observer(BoxDraggable);
