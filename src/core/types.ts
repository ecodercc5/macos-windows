export const a = [];

interface IApp {
  name: string;
  icon: string;
  state: AppState;
}

export type AppState = "opened" | "closed" | "opening";

export type AppStatus = AppState;

export interface IAppState {
  apps: IApp[];
}
