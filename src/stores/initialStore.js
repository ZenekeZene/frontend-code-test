import BoxModel from "./models/Box";

const potentialEmployee = "Zenekezene";
const potentialEmployer = "Genially";
const subject = Math.random() > 0.5 ? potentialEmployee : potentialEmployer;
const anotherSubject = (subject === potentialEmployee ? potentialEmployer : potentialEmployee) + '!';

const boxSize = {
	width: 136,
	height: 66,
	middleWidth: boxSize.width / 2,
	middleHeight: boxSize.height / 2,
};

const screen = {
	x: window.innerWidth / 2,
	y: window.innerHeight / 2,
};

const gap = 60;

const boxesConfigByDefault = {
	color: "black",
	backgroundColor: "#FFD75E",
	width: boxSize.width,
	height: boxSize.height,
};

const createInitialBoxes = ({ store }) => {
	if (!store) return;

	const addBoxToStore = (id, left, text) => {
		store.addBox(BoxModel.create({
			id,
			...boxesConfigByDefault,
			left,
			top: screen.y - boxSize.height / 2,
			text,
		}));
	};

  addBoxToStore("1", screen.x - boxSize.width - boxSize.middleWidth - gap, subject);
  addBoxToStore("2", screen.x - boxSize.boxSize, 'meets');
  addBoxToStore("3", screen.x + boxSize.width - boxSize.middleWidth + gap, anotherSubject);
};

export { createInitialBoxes };
