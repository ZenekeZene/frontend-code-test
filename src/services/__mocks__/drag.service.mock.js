const DragService = ({ targetElement, move, end }) => ({
	init: () => {
		const handleMove = (event) => {
			const offsetX = event.clientX - targetElement.getBoundingClientRect().left;
      const offsetY = event.clientY - targetElement.getBoundingClientRect().top;
			const delta = {
				x: offsetX,
				y: offsetY
			};
			move(event, delta);
		};
		targetElement.addEventListener('mousemove', handleMove);
		targetElement.addEventListener('mouseup', end);

		return {
			unset: () => {
				targetElement.removeEventListener('mousemove', move);
				targetElement.removeEventListener('mouseup', end);
			}
		};
	},
});

export { DragService };
