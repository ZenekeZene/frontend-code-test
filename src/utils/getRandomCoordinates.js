const fullScreen = {
  width: "100%",
  height: "100%",
};

const securityOffsetInPixels = {
  horizontal: 200,
  vertical: 200,
};

const isFullScreen = (canvasSize) => {
  return (
    canvasSize.width === fullScreen.width ||
    canvasSize.height === fullScreen.height
  );
};

const getRandomCoordinates = (canvasSize, boxSize) => {
  let width = canvasSize.width;
  let height = canvasSize.height;

  if (isFullScreen(canvasSize)) {
    width = window.innerWidth;
    height = window.innerHeight;
  }
  const randomX = Math.random() * (width / 2 - boxSize.width);
  const randomY = Math.random() * (height / 2 - boxSize.height);

  const coordinates = {
    left: securityOffsetInPixels.horizontal + randomX,
    top: securityOffsetInPixels.vertical + randomY,
  };
  return coordinates;
};

export { getRandomCoordinates };
