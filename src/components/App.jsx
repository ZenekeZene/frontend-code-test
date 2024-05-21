import React from "react";
import { observer } from "mobx-react";
import store from "../stores/MainStore";
import { createInitialBoxes } from "../stores/initialStore";
import { debugStore } from "../stores/useStoreDebug";
import Canvas from "./Canvas";
import { Toolbar } from "./Toolbar/Toolbar";

createInitialBoxes({ store });

function App() {
  debugStore(store);

  return (
    <div className="app">
      <Toolbar store={store} />
      <Canvas store={store} />
    </div>
  );
}

export default observer(App);
