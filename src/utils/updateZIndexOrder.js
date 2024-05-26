const updateZIndexOrder = ({ boxes, boxToRaise }) => {
	if (!boxes.length) return { box: null, zIndex: 0 };
  const zIndexThreshold = boxes.length;

  let highestZIndexValue = 0;

  boxes.forEach((box) => {
    const zIndex = parseInt(box.node.style.zIndex, 10) || 0;
    if (zIndex > highestZIndexValue) {
      highestZIndexValue = zIndex;
    }
  });

	// (1)
  if (highestZIndexValue >= zIndexThreshold) {
    const sortedBoxes = [...boxes].sort((a, b) => {
      const zIndexA = parseInt(a.node.style.zIndex, 10) || 0;
      const zIndexB = parseInt(b.node.style.zIndex, 10) || 0;
      return zIndexA - zIndexB;
    });

    sortedBoxes.forEach((box, index) => {
      box.node.style.zIndex = index;
    });

    highestZIndexValue = sortedBoxes.length - 1;
  }

  boxToRaise.node.style.zIndex = highestZIndexValue + 1;
};

export { updateZIndexOrder };

// (1): If the highest zIndex value exceeds the threshold, reorder all zIndices starting from 0.
