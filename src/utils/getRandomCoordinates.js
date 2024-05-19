const widthBox = 200;
const heightBox = 100;

const fullScreen = {
	width: '100%',
	height: '100%',
};

const isFullScreen = (canvasSize) => {
	return canvasSize.width === fullScreen.width || canvasSize.height === fullScreen.height;
};

const getRandomCoordinates = (canvasSize) => {
	let width = canvasSize.width;
	let height = canvasSize.height;
	if (isFullScreen(canvasSize)) {
		width = window.innerWidth;
		height = window.innerHeight;
	}
	const randomX = Math.random() * (width - widthBox);
	const randomY = Math.random() * (height - heightBox);

	const coordinates = {
		left: randomX,
		top: randomY,
	};
	return coordinates;
};

export { getRandomCoordinates };
