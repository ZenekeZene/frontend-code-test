import { UndoManager } from "mst-middlewares";

let undoManager = null;

export const getUndoManager = () => {
	if (!undoManager) {
		throw new Error("UndoManager is not set");
	}
	return undoManager;
};

export const setUndoManager = (targetStore) => {
  undoManager = UndoManager.create({}, { targetStore });

	return {
		get: () => undoManager,
	};
};
