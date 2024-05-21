import React from 'react';
import { IconDelete } from "../../icons/IconDelete";
import { IconEdit } from "../../icons/IconEdit";
import { IconFontColors } from "../../icons/IconFontColors";
import "./BoxTools.css";

const BoxTools = ({ box, isEditing, onEdit, onRemove }) => {
	const { backgroundColor } = box;

	const handleChangeColor = (event) => {
    box.changeColor(event.target.value);
  };

  const handleChangeBackgroundColor = (event) => {
    box.changeBackgroundColor(event.target.value);
  };

	return (
		<section className="box-tools">
			<span className="box-tools__bgcolor box-tools__tool">
				<span className="box-tools__bgcolor-watch" style={{ backgroundColor }}></span>
				<input type="color" onChange={handleChangeBackgroundColor} />
			</span>
			<span className="box-tools__color box-tools__tool">
				<IconFontColors />
				<input type="color" onChange={handleChangeColor} />
			</span>
			<span className="box-tools__remove box-tools__tool"
				onClick={onRemove}
			>
				<IconDelete />
			</span>
			<span className={`box-tools__edit box-tools__tool ${isEditing ? '--is-editing': ''}`}
				onClick={onEdit}
			>
				<IconEdit />
			</span>
		</section>
	);
};

export { BoxTools };
