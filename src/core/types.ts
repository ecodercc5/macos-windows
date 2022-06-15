export const a = [];

interface IApp {
  name: string;
  icon: string;
  state: AppState;
}

type AppState = "opened" | "closed" | "opening";
