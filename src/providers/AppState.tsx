import { createContext, PropsWithChildren, useContext } from "react";
import { State } from "../core/store";
import { IAppState } from "../core/types";

const AppStateContext = createContext<State<IAppState>>(null!);

interface Props {
  state: State<IAppState>;
}

export const AppState: React.FC<PropsWithChildren<Props>> = ({
  state,
  children,
}) => {
  return (
    <AppStateContext.Provider value={state}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => useContext(AppStateContext);
