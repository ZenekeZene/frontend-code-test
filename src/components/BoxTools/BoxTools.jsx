import React from 'react';
import { IconDelete } from "../../icons/IconDelete";
import { IconEdit } from "../../icons/IconEdit";
import { IconFontColors } from "../../icons/IconFontColors";

const BoxTools = ({ box, isEditing, onEdit, onRemove }) => {
	const { backgroundColor } = box;

	const handleChangeColor = (event) => {
    box.changeColor(event.target.value);
  };

  const handleChangeBackgroundColor = (event) => {
    box.changeBackgroundColor(event.target.value);
  };

	return (
		<section className="box__tools">
			<span className="box__bgcolor box__tool">
				<span className="box__bgcolor-watch" style={{ backgroundColor }}></span>
				<input type="color" onChange={handleChangeBackgroundColor} />
			</span>
			<span className="box__color box__tool">
				<IconFontColors />
				<input type="color" onChange={handleChangeColor} />
			</span>
			<span className="box__remove box__tool"
				onClick={onRemove}
			>
				<IconDelete />
			</span>
			<span className={`box__edit box__tool ${isEditing ? '--is-editing': ''}`}
				onClick={onEdit}
			>
				<IconEdit />
			</span>
		</section>
	);
};

export { BoxTools };
