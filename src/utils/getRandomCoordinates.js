const widthBox = 200;
const heightBox = 100;

const getRandomCoordinates = (canvasSize) => {
	const randomX = Math.random() * (canvasSize.width - widthBox);
	const randomY = Math.random() * (canvasSize.height - heightBox);

	const coordinates = {
		left: randomX,
		top: randomY,
	};
	return coordinates;
};

export { getRandomCoordinates };
