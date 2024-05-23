import React from "react";
import { observer } from "mobx-react";
import { getClassnames } from '../../../utils/getClassnames';

const BoxDraggable = React.forwardRef(({ box, children, ...rest }, ref) => {
  const localRef = React.useRef();
  React.useImperativeHandle(ref, () => localRef.current);

  const { onClick, onMouseOver, onMouseLeave, onDoubleClick } = rest;
  const { color, width, height, left, top } = box;
  const { id, isSelected, isHovered } = box;

  const style = {
    color,
    minWidth: width,
    minHeight: height,
    transform: `translate(${left}px, ${top}px)`,
  };

  const classNames = getClassnames([
    'box',
    isSelected && '--is-selected',
    isHovered && '--is-hovered',
  ]);

  return (
    <div
      ref={localRef}
      id={id}
      role="button"
      className={classNames}
      aria-pressed={isSelected}
      style={style}
      onMouseLeave={() => onMouseLeave(box)}
      onMouseOver={() => onMouseOver(box)}
      onClick={() => onClick(box)}
      onDoubleClick={onDoubleClick}
    >
      {children}
    </div>
  );
});

export default observer(BoxDraggable);
