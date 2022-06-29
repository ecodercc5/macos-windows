import { IMacOSWindows } from "./macos-window";

export interface IApp {
  name: string;
  icon: string;
  status: AppState;
  id: string;
}

export type AppState = "opened" | "closed" | "opening";

export type AppStatus = AppState;

export interface IAppState {
  windows: IMacOSWindows;
  apps: IApp[];
}
