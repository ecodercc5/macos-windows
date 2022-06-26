import { IAppState } from "./types";

export const appIdsFromAppState = (appState: IAppState) =>
  appState.apps.map((app) => app.id);
