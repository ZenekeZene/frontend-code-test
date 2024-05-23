import { v4 as uuid } from "uuid";
import boxesConfigByDefault, { size } from '../constants/box';
import screen from '../constants/screen';
import { BoxModel } from "./models/BoxModel";

const potentialEmployee = "Zenekezene";
const potentialEmployer = "Genially";
const subject = Math.random() > 0.5 ? potentialEmployee : potentialEmployer;
const anotherSubject = (subject === potentialEmployee ? potentialEmployer : potentialEmployee) + '!';

const gapInPixels = 60;

const createInitialBoxes = ({ store }) => {
	if (!store) return;

	const addBoxToStore = (left, text) => {
		store.addBox(BoxModel.create({
			id: uuid(),
			...boxesConfigByDefault,
			left,
			top: screen.y - size.height / 2,
			text,
		}));
	};

  addBoxToStore(screen.x - size.width - size.middleWidth - gapInPixels, subject);
  addBoxToStore(screen.x - size.middleWidth, 'meets');
  addBoxToStore(screen.x + size.width - size.middleWidth + gapInPixels, anotherSubject);
};

export { createInitialBoxes };
