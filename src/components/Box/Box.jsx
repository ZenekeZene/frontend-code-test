import React from "react";
import { observer } from "mobx-react";
import { IconDelete } from "../../icons/IconDelete";
import { IconEdit } from "../../icons/IconEdit";
import BoxDraggable from "../BoxDraggable/BoxDraggable";
import "./Box.css";

const Box = React.forwardRef((props, ref) => {
  const textRef = React.useRef();
  const [isEditing, setIsEditing] = React.useState(false);
  const localRef = React.useRef();

  React.useImperativeHandle(ref, () => localRef.current);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleDoubleClick = () => {
    if (isEditing) return;
    setIsEditing(true);
  };

  React.useEffect(() => {
    if (isEditing) {
      textRef.current.focus();
    }
  }, [isEditing]);

  return (
    <BoxDraggable {...props} ref={localRef} onDoubleClick={handleDoubleClick}>
      <section className="box__tools">
        { !props.areMultipleBoxesSelected && (
          <span className="box__remove" onClick={props.onRemove}>
            <IconDelete />
          </span>
        )}
        { !props.areMultipleBoxesSelected && (
          <span className={`box__edit ${isEditing ? '--is-editing': ''}`} onClick={handleEdit}>
            <IconEdit />
          </span>
        )}
      </section>
      <div ref={textRef}
        className="box__text"
        contentEditable={isEditing}
      ></div>
    </BoxDraggable>
  );
});

export default observer(Box);
