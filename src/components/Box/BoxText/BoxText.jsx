import React from "react";
import "./BoxText.css";

const BoxText = ({ isEditing, color, text, onBlur }) => {
  const textRef = React.useRef();

  const focusInLastCharacter = React.useCallback(() => {
    const range = document.createRange();
    const sel = window.getSelection();
    range.selectNodeContents(textRef.current);
    range.collapse(false);
    sel.removeAllRanges();
    sel.addRange(range);
  }, []);

  React.useEffect(() => {
    if (document.activeElement === textRef.current) return;
    isEditing && focusInLastCharacter();
  }, [isEditing, focusInLastCharacter]);

  return (
    <div
      ref={textRef}
      role="textbox"
      aria-label="Edit the text"
      className="box__text"
      contentEditable={isEditing}
      suppressContentEditableWarning
      onBlur={onBlur}
      style={{ color }}
    >
      {text}
    </div>
  );
};

export { BoxText };
