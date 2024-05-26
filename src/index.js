import React from "react";
import "./main.css";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";

import { createRoot } from "react-dom/client";
const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);

serviceWorker.unregister();
