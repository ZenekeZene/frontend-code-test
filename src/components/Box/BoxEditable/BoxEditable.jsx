import React from "react";
import { observer } from "mobx-react";
import BoxDraggable from "../BoxDraggable/BoxDraggable";
import { BoxTools } from "../BoxTools/BoxTools";
import { BoxFolderAesthetic } from "../BoxFolderAesthetic/BoxFolderAesthetic";
import { BoxText } from "../BoxText/BoxText";
import "./BoxEditable.css";

const Box = React.forwardRef((props, ref) => {
  const localRef = React.useRef();
  const { box } = props;

  React.useImperativeHandle(ref, () => localRef.current);

  const handleDoubleClick = () => {
    if (box.isEditingText) return;
    box.setIsEditingText(true);
  };

  const onTextBlur = (event) => {
    box.setText(event.target.innerText);
  };

  return (
    <BoxDraggable {...props}
      ref={localRef}
      onDoubleClick={handleDoubleClick}
    >
      <BoxFolderAesthetic
        height={props.height}
        darkerBackgroundColor={box.darkerBackgroundColor}
        backgroundColor={
          box.isEditingBackgroundColor
            ? box.currentBackgroundColor
            : box.backgroundColor
        }
      >
        {!props.areMultipleBoxesSelected && (
          <BoxTools box={box} onRemove={props.onRemove} />
        )}

        <BoxText
          isEditing={box.isEditingText}
          text={box.text}
          color={box.isEditingColor ? box.currentColor : box.color}
          onBlur={onTextBlur}
        />
      </BoxFolderAesthetic>
    </BoxDraggable>
  );
});

export default observer(Box);
