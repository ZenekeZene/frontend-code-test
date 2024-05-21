import React from "react";
import { observer } from "mobx-react";
import BoxDraggable from "../BoxDraggable/BoxDraggable";
import { BoxTools } from "../BoxTools/BoxTools";
import { BoxFolderAesthetic } from "../BoxFolderAesthetic/BoxFolderAesthetic";
import { BoxText } from "../BoxText/BoxText";
import "./Box.css";

const Box = React.forwardRef((props, ref) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const localRef = React.useRef();
  const { box } = props;

  React.useImperativeHandle(ref, () => localRef.current);

  const handleDoubleClick = () => {
    if (isEditing) return;
    setIsEditing(true);
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const onTextBlur = (event) => {
    box.setText(event.target.innerText);
  };

  return (
    <BoxDraggable
      {...props}
      ref={localRef}
      onDoubleClick={handleDoubleClick}
    >
      <BoxFolderAesthetic
        height={props.height}
        backgroundColor={box.backgroundColor}
        darkerBackgroundColor={box.darkerBackgroundColor}
      >
        { !props.areMultipleBoxesSelected && (
          <BoxTools
            box={box}
            isEditing={isEditing}
            onEdit={handleEdit}
            onRemove={props.onRemove}
          />
        )}

        <BoxText
          isEditing={isEditing}
          text={box.text}
          color={box.color}
          onBlur={onTextBlur}
        />

      </BoxFolderAesthetic>
    </BoxDraggable>
  );
});

export default observer(Box);
