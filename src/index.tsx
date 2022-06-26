import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AppState } from "./providers/AppState";
import { Store } from "./core/store";
import { IAppState } from "./core/types";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const DEFAULT_APP_STATE: IAppState = {
  apps: [
    {
      name: "Finder",
      icon: "https://upload.wikimedia.org/wikipedia/commons/c/c9/Finder_Icon_macOS_Big_Sur.png",
      id: "finder",
      status: "closed",
    },
  ],
};
const appState$ = Store.create<IAppState>(DEFAULT_APP_STATE);

root.render(
  <React.StrictMode>
    <AppState state={appState$}>
      <App />
    </AppState>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
