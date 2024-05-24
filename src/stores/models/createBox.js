import { v4 as uuid } from "uuid";
import { BoxModel } from "./BoxModel";
import {
  availableBackgroundColors,
  defaultFontColor,
} from "../../constants/colors";
import { canvasSize } from "../../constants/canvas";
import boxesConfigByDefault, { boxSize } from "../../constants/box";
import { getRandomCoordinates } from "../../utils/getRandomCoordinates";

export const createBox = ({ backgroundColor } = { background: null }) => {
  const coordinates = getRandomCoordinates(canvasSize, boxSize);
  const randomBackgroundColor =
    availableBackgroundColors[
      Math.floor(Math.random() * availableBackgroundColors.length)
    ];

  return BoxModel.create({
    id: uuid(),
    color: defaultFontColor,
    backgroundColor: backgroundColor || randomBackgroundColor,
    ...coordinates,
  });
};

export const createBoxWithCustomNode = ({ id, left = 0, top = 0 }) => {
  const node = document.createElement("div");
  node.id = id;
  node.getBoundingClientRect = () => ({
    top,
    left,
  });
  const instance = BoxModel.create({
    id: uuid(),
    ...boxesConfigByDefault,
    left,
    top,
    text: "",
  });
  instance.setNode(node);
  return instance;
};
