import { useMemo } from "react";
import { map } from "rxjs";
import { Store } from "../core/store";
import { IApp, IAppState } from "../core/types";
import { useAppState } from "../providers/AppState";
import { useObserveState } from "./use-observe-state";

export const useMacOSApp = (
  appId: string
): [IApp | undefined, { open: () => void }] => {
  const appState$ = useAppState();

  const macosApp$ = useMemo(() => {
    return appState$.pipe(
      map((appState) => appState.apps.find((app) => app.id === appId))
    );
  }, [appState$, appId]);

  const open = () => {
    Store.update(appState$, (appState): IAppState => {
      return {
        ...appState,
        apps: appState.apps.map((app) =>
          app.id === appId ? { ...app, status: "opening" } : app
        ),
      };
    });

    Promise.resolve().then(() => {
      Store.update(appState$, (appState): IAppState => {
        return {
          ...appState,
          apps: appState.apps.map((app) =>
            app.id === appId ? { ...app, status: "opened" } : app
          ),
        };
      });
    });
  };

  return [useObserveState(macosApp$), { open }];
};
