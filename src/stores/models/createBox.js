
import { v4 as uuid } from "uuid";
import { BoxModel } from "./BoxModel";
import { availableBackgroundColors, defaultFontColor } from '../../constants/colors';
import { getRandomCoordinates } from "../../utils/getRandomCoordinates";
import { canvasSize } from "../../constants/canvas";

export const createBox = () => {
  const coordinates = getRandomCoordinates(canvasSize);
	const backgroundColor = availableBackgroundColors[Math.floor(Math.random() * availableBackgroundColors.length)];

  return BoxModel.create({
    id: uuid(),
    color: defaultFontColor,
    backgroundColor,
    ...coordinates,
  });
};
