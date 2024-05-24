import { v4 as uuid } from "uuid";
import boxesConfigByDefault, { boxSize } from "../constants/box";
import screen from "../constants/screen";
import { BoxModel } from "./models/BoxModel";

const potentialEmployee = "Zenekezene";
const potentialEmployer = "Genially";

const gapInPixels = 60;

const createInitialBoxes = ({ store }) => {
  if (!store) return;

  const addBoxToStore = (left, text) => {
    store.addBox(
      BoxModel.create({
        id: uuid(),
        ...boxesConfigByDefault,
        left,
        top: screen.y - boxSize.height / 2,
        text,
      }),
    );
  };

  addBoxToStore(
    screen.x - boxSize.width - boxSize.middleWidth - gapInPixels,
    potentialEmployee,
  );
  addBoxToStore(screen.x - boxSize.middleWidth, "meets");
  addBoxToStore(
    screen.x + boxSize.width - boxSize.middleWidth + gapInPixels,
    potentialEmployer,
  );
};

export { createInitialBoxes };
