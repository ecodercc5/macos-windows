import { useMemo } from "react";
import { distinctUntilChanged, map } from "rxjs";
import { useAppState } from "../providers/AppState";
import { useExperimentalObserveState } from "./use-observe-state";
import memoize from "memoizee";
import { IMacOSWindows } from "../core/macos-window";
import { Store } from "../core/store";
import { AppState, IAppState } from "../core/types";

const getWindows = memoize((windows: IMacOSWindows) => {
  return Object.values(windows);
});

export const useMacOSWindows = () => {
  const appState$ = useAppState();
  const windows$ = useMemo(() => {
    return appState$.pipe(
      map((appState) => getWindows(appState.windows)),
      distinctUntilChanged()
    );
  }, [appState$]);

  return useExperimentalObserveState(windows$);
};

export const useMacOSWindowMutations = (appId: string) => {
  const appState$ = useAppState();

  const close = () => {
    Store.update(appState$, (appState): IAppState => {
      return {
        ...appState,
        windows: {},
        apps: appState.apps.map((app) =>
          app.id === appId ? { ...app, status: "closed" } : app
        ),
      };
    });
  };

  return { close };
};
