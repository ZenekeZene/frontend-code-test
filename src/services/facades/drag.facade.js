import interact from "interactjs";

class DragFacade {
  #draggableConfig = {
    inertia: false,
    modifiers: [
      interact.modifiers.restrictRect({
        restriction: "parent",
        endOnly: false,
      }),
    ],
  };

  constructor({ targetElement, move, end }) {
    this.targetElement = targetElement;
    this.move = move;
    this.end = end;
  }

  init() {
    interact(this.targetElement).draggable({
      ...this.#draggableConfig,
      listeners: {
        move: this.move,
        end: this.end,
      },
    });
  }

  unset() {
    interact(this.targetElement).unset();
  }
}

export { DragFacade };
