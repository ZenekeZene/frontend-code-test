const fullScreen = {
	width: '100%',
	height: '100%',
};

const isFullScreen = (canvasSize) => {
	return canvasSize.width === fullScreen.width || canvasSize.height === fullScreen.height;
};

const getRandomCoordinates = (canvasSize, boxSize) => {
	let width = canvasSize.width;
	let height = canvasSize.height;

	if (isFullScreen(canvasSize)) {
		width = window.innerWidth;
		height = window.innerHeight;
	}
	const randomX = Math.random() * (width - boxSize.width);
	const randomY = Math.random() * (height - boxSize.height);

	const coordinates = {
		left: randomX,
		top: randomY,
	};
	return coordinates;
};

export { getRandomCoordinates };
