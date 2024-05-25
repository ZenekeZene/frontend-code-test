import { v4 as uuid } from "uuid";
import boxesConfigByDefault, { boxSize } from "../constants/box";
import screen from "../constants/screen";
import { BoxModel } from "./models/BoxModel";

const potentialEmployee = "Zenekezene";
const potentialEmployer = "Genially";

const gapInPixels = 60;

const createInitialBoxes = ({ store }) => {
  if (!store) return;

  const addBoxToStore = (top, text) => {
    store.addBox(
      BoxModel.create({
        id: uuid(),
        ...boxesConfigByDefault,
        left: screen.x - boxSize.middleWidth,
        top,
        text,
      }),
    );
  };

  addBoxToStore(
    screen.y - boxSize.height - boxSize.middleHeight - gapInPixels,
    potentialEmployee,
  );
  addBoxToStore(screen.y - boxSize.middleHeight, "meets");
  addBoxToStore(
    screen.y + boxSize.height - boxSize.middleHeight + gapInPixels,
    potentialEmployer,
  );
};

export { createInitialBoxes };
