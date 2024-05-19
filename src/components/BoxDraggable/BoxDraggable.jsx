import React from "react";
import { observer } from "mobx-react";

const BoxDraggable = React.forwardRef((props, ref) => {
  const localRef = React.useRef();

  React.useImperativeHandle(ref, () => localRef.current);

  const { id, color, width, height, left, top, isSelected } = props.box;

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
      onMouseLeave={props.onMouseLeave}
      onMouseOver={() => props.onMouseOver(props.box)}
      onClick={() => props.onClick(props.box)}
    >
      {props.children}
    </div>
  );
});

export default observer(BoxDraggable);
