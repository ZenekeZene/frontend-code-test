import React from "react";

import store from "../stores/MainStore";
import Canvas from "./Canvas";
import Toolbar from "./Toolbar";
import { observer } from "mobx-react";
import { debugStore } from "../stores/useStoreDebug";

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
