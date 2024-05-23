import React from "react";
import { observer } from "mobx-react";
import store from "../stores/MainStore";
import { getUndoManager } from "../services/undo.service";
import { debugStore } from "../stores/useStoreDebug";
import Canvas from "./Canvas";
import { Toolbar } from "./Toolbar/Toolbar";

store.loadFromStorage();
const undoManager = getUndoManager();

function App() {
  debugStore(store);
  debugStore(undoManager);

  return (
    <div className="app">
      <Toolbar store={store} />
      <Canvas store={store} />
    </div>
  );
}

export default observer(App);
