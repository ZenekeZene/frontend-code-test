import React from 'react';
import { Icon } from "../../../icons";
import "./BoxTools.css";

const BoxTools = ({ box, onRemove }) => {
	if (!box) return;

	const handleChangeColor = (event) => {
		box.changeCurrentColor(event.target.value);
  };

  const handleChangeBackgroundColor = (event) => {
    box.changeCurrentBackgroundColor(event.target.value);
  };

	const handleBlurColor = (event) => {
		box.changeColor(event.target.value);
		box.setIsEditingColor(false);
	};

	const handleBlurBackgroundColor = (event) => {
		box.changeBackgroundColor(event.target.value);
		box.setIsEditingBackgroundColor(false);
	};

	const handleEditText = () => {
    box.setIsEditingText(!box.isEditingText);
  };

	return (
		<section className="box-tools" role="menu">
			<span className="box-tools__bgcolor box-tools__tool"
				onBlur={handleBlurBackgroundColor}
				role="menuitem"
			>
				<span className="box-tools__bgcolor-watch"
					style={{ backgroundColor: box.isEditingBackgroundColor ? box.currentBackgroundColor : box.backgroundColor }}
				></span>
				<input type="color"
					onFocus={() => box.setIsEditingBackgroundColor(true)}
					onChange={handleChangeBackgroundColor}
					value={box.isEditingBackgroundColor ? box.currentBackgroundColor : box.backgroundColor}
					role="input"
					aria-label="change background color"
				/>
			</span>
			<span className="box-tools__color box-tools__tool"
				onBlur={handleBlurColor}
				role="menuitem"
			>
				<Icon.FontColors />
				<input type="color"
					onFocus={() => box.setIsEditingColor(true)}
					onChange={handleChangeColor}
					value={box.isEditingColor ? box.currentColor : box.color}
					aria-label="change text color"
					role="input"
				/>
			</span>
			<span className="box-tools__remove box-tools__tool"
				onClick={onRemove}
				role="menuitem"
				aria-label="delete box"
			>
				<Icon.Delete />
			</span>
			<span className={`box-tools__edit box-tools__tool ${box.isEditingText ? '--is-editing': ''}`}
				onClick={handleEditText}
				role="menuitem"
				aria-label="edit text"
			>
				<Icon.Edit />
			</span>
		</section>
	);
};

export { BoxTools };
