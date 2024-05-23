const DragService = ({ targetElement, move, end }) => ({
  init: () => {
    const handleMove = (event) => {
      const offsetX =
        event.clientX - targetElement.getBoundingClientRect().left;
      const offsetY = event.clientY - targetElement.getBoundingClientRect().top;
      const fakeEvent = {
        dx: offsetX,
        dy: offsetY,
      };
      move(fakeEvent);
    };
    targetElement.addEventListener("mousemove", handleMove);
    targetElement.addEventListener("mouseup", end);

    return {
      unset: () => {
        targetElement.removeEventListener("mousemove", move);
        targetElement.removeEventListener("mouseup", end);
      },
    };
  },
});

export { DragService };
