import { useHotkeys } from "react-hotkeys-hook";
import { useKeyPress } from "../../hooks/useKeyPress/useKeyPress";
import { getUndoManager } from "../../services/undo.service";

const undoManager = getUndoManager();

const useKeyboardShortcuts = ({ store }) => {
	useHotkeys("Delete", store.removeSelectedBoxes);
	useHotkeys("Escape", store.unselectAllBoxes);
  useHotkeys("Backspace", store.removeSelectedBoxes);

  useKeyPress({
    key: "Shift",
    onDown: () => {
      store.setMultipleBoxesSelectedEnabled(true);
    },
    onUp: () => {
      store.setMultipleBoxesSelectedEnabled(false);
    }
  });

  useHotkeys(["ctrl+z", "meta+z"], () => undoManager.canUndo && undoManager.undo());
  useHotkeys(["ctrl+shift+z", "meta+shift+z"], () => undoManager.canRedo && undoManager.redo());

};

export { useKeyboardShortcuts };
