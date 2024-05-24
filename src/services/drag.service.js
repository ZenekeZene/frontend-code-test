import { DragFacade } from "./facades/drag.facade";

const DragService = ({ targetElement, start, move, end }) => {
  const proxiedMove = (event) => {
    const delta = { x: event.dx, y: event.dy };
    move(event, delta);
  };
  const dragFacade = new DragFacade({ targetElement, start, move: proxiedMove, end });

  return {
    init: () => {
      dragFacade.init();

      return {
        unset: () => {
          dragFacade.unset();
        },
      };
    },
  };
};

export { DragService };
