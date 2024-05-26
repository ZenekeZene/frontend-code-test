import React from "react";
import { observer } from "mobx-react";
import { applyDelay } from "../../utils/applyDelay";
import { isBoxOverlapping } from "../../utils/isBoxOverlapping";
import { BoxSelectionTool } from "../Box/BoxSelectionTool/BoxSelectionTool";
import { useSelectionToolCoordinates } from "../../hooks/useSelectionToolCoordinates/useSelectionToolCoordinates";
import { useDelayUnmount } from "../../hooks/useDelayUnmount/useDelayUnmount";
import "./SelectionCanvas.css";

const SelectionCanvas = React.forwardRef(
  ({ store, onMouseUp, onMouseMove, children }, ref) => {
    const { boxes } = store;
    const isAnyBoxSelected = store.isAnyBoxSelected();
    const boxSelectionToolRef = React.useRef(null);
    const shouldRenderBoxSelection = useDelayUnmount(store.isSelecting, 200);

    const calculateSelectedBoxes = (boxes) =>
      boxes.filter((box) =>
        isBoxOverlapping(box.node, boxSelectionToolRef.current),
      );

    const handleMouseDown = () => {
      store.setIsSelecting(true);
    };

    const handleMouseMove = () => {
      if (!boxSelectionToolRef.current) return;
      const hoveredBoxes = calculateSelectedBoxes(boxes);
      onMouseMove(hoveredBoxes);
    };

    const handleMouseUp = () => {
      if (!boxSelectionToolRef.current) return;
      const selectedBoxes = calculateSelectedBoxes(boxes);
      onMouseUp(selectedBoxes);
      applyDelay(() => store.setIsSelecting(false));
    };

    const { coordinates, ...events } = useSelectionToolCoordinates({
      isAnyBoxSelected,
      handleMouseDown,
      handleMouseMove,
      handleMouseUp,
    });

    return (
      <div ref={ref} role="group" className="selection-canvas" {...events}>
        {shouldRenderBoxSelection && (
          <BoxSelectionTool
            ref={boxSelectionToolRef}
            isSelecting={store.isSelecting}
            startCoordinates={coordinates.start}
            endCoordinates={coordinates.end}
          />
        )}
        {children}
      </div>
    );
  },
);

const SelectionCanvasObserver = observer(SelectionCanvas);
export { SelectionCanvasObserver as SelectionCanvas };
