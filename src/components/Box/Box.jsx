import React from "react";
import { observer } from "mobx-react";
import { IconDelete } from "../../icons/IconDelete";
import { IconEdit } from "../../icons/IconEdit";
import { IconFontColors } from "../../icons/IconFontColors";
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

  const handleChangeColor = (event) => {
    props.box.changeColor(event.target.value);
  };

  const handleChangeBackgroundColor = (event) => {
    props.box.changeBackgroundColor(event.target.value);
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
        <>
          <span className="box__bgcolor box__tool">
            <input type="color" onChange={handleChangeBackgroundColor} />
            <span className="box__bgcolor-watch" style={{ backgroundColor: props.box.backgroundColor }}></span>
          </span>
          <span className="box__color box__tool">
            <input type="color" onChange={handleChangeColor} />
            <IconFontColors />
          </span>
          <span className="box__remove box__tool" onClick={props.onRemove}>
            <IconDelete />
          </span>
          <span className={`box__edit box__tool ${isEditing ? '--is-editing': ''}`} onClick={handleEdit}>
            <IconEdit />
          </span>
        </>
      )}
      </section>
      <div ref={textRef}
        className="box__text"
        contentEditable={isEditing}
        style={{ color: props.box.color }}
      ></div>
    </BoxDraggable>
  );
});

export default observer(Box);
