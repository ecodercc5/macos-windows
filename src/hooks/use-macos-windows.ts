import { useMemo } from "react";
import { map } from "rxjs";
import { useAppState } from "../providers/AppState";
import { useExperimentalObserveState } from "./use-observe-state";
import memoize from "memoizee";
import { IAppState } from "../core/types";

const getWindows = memoize((appState: IAppState) => {
  return Object.values(appState.windows);
});

export const useMacOSWindows = () => {
  const appState$ = useAppState();
  const windows$ = useMemo(() => {
    return appState$.pipe(
      map(getWindows)
      //   map((appState) => appState.windows),
      //   map((windows) => Object.values(windows))
    );
  }, [appState$]);

  return useExperimentalObserveState(windows$);
};
