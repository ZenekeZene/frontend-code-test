import React from "react";
import { observer } from "mobx-react";
import store, { undoManager } from "../stores/MainStore";
import { debugStore } from "../stores/useStoreDebug";
import Canvas from "./Canvas";
import { Toolbar } from "./Toolbar/Toolbar";

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
