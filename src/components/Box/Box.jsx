import React from "react";
import { observer } from "mobx-react";
import BoxDraggable from "../BoxDraggable/BoxDraggable";
import { BoxTools } from "../BoxTools/BoxTools";
import "./Box.css";

const Box = React.forwardRef((props, ref) => {
  const textRef = React.useRef();
  const [isEditing, setIsEditing] = React.useState(false);
  const localRef = React.useRef();

  React.useImperativeHandle(ref, () => localRef.current);

  const handleDoubleClick = () => {
    if (isEditing) return;
    setIsEditing(true);
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleChangeText = () => {
    props.box.setText(textRef.current.innerText);
  };

  React.useEffect(() => {
    if (isEditing) {
      textRef.current.focus();
    }
  }, [isEditing]);

  return (
    <BoxDraggable {...props} ref={localRef} onDoubleClick={handleDoubleClick}>
      <div className="box__front"
        style={{
          minHeight: props.box.height,
          backgroundColor: props.box.backgroundColor,
          borderColor: props.box.darkerBackgroundColor,
        }}
      >
        { !props.areMultipleBoxesSelected && (
          <BoxTools
            box={props.box}
            isEditing={isEditing}
            onEdit={handleEdit}
            onRemove={props.onRemove}
          />
        )}
        <svg className="box__ribbon" viewBox="0 0 53 7" xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" style={{ fillRule: 'evenodd', clipRule: 'evenodd', strokeLinejoin:'round', strokeMiterlimit: '2' }}>
          <path style={{ fill: 'none' }} d="M0 0h53.535v7.705H0z"/>
          <path d="M52.553 6.947V4.033a3 3 0 0 0-3-3h-42L3.31 5.276A6 6 0 0 1 .083 6.947h52.47Z" style={{ fill: props.box.backgroundColor }} />
        </svg>

        <div ref={textRef}
          className="box__text"
          contentEditable={isEditing}
          onInput={handleChangeText}
          style={{ color: props.box.color }}
        >{props.box.text}</div>
      </div>
      <div className="box__paper"></div>
      <div className="box__back"
        style={{ backgroundColor: props.box.darkerBackgroundColor }}
      >
      </div>
      <svg className="box__ribbon-back" viewBox="0 0 39 7" xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" style={{ fillRule: 'evenodd', clipRule: 'evenodd', strokeLinejoin: 'round', strokeMiterlimit: '2' }}><path d="m38.828 6.828-4.071-4.071A6 6 0 0 0 30.515 1H3a3 3 0 0 0-3 3v2.828h38.828Z" style={{ fill: props.box.darkerBackgroundColor }}/></svg>
    </BoxDraggable>
  );
});

export default observer(Box);
