import React from "react";
import { observer } from "mobx-react";
import store from "../stores/MainStore";
import { createInitialBoxes } from "../stores/initialStore";
import { getUndoManager } from "../services/undo.service";
import { useStoreDebug } from "../hooks/useStoreDebug/useStoreDebug";
import Canvas from "./Canvas/Canvas";
import { Toolbar } from "./Toolbar/Toolbar";

store.loadFromStorage();
const undoManager = getUndoManager();

undoManager.withoutUndo(() => {
  createInitialBoxes({ store });
});

function App() {
  useStoreDebug(store);
  useStoreDebug(undoManager);

  return (
    <div className="app">
      <Toolbar store={store} />
      <Canvas store={store} />
    </div>
  );
}

export default observer(App);
