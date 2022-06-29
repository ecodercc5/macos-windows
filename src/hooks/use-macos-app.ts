import { useEffect, useMemo } from "react";
import { distinctUntilChanged, map } from "rxjs";
import { Store } from "../core/store";
import { IApp, IAppState } from "../core/types";
import { useAppState } from "../providers/AppState";
import { useExperimentalObserveState } from "./use-observe-state";
import memoize from "memoizee";
import { MacOSWindow } from "../core/macos-window";

const getAppIds = memoize((apps: IApp[], appId: string) => {
  return apps.find((app) => app.id === appId);
});

export const useMacOSApp = (
  appId: string
): [IApp | undefined, { open: () => void }] => {
  const appState$ = useAppState();

  const macosApp$ = useMemo(() => {
    return appState$.pipe(
      map((appState) => appState.apps),
      map((apps) => getAppIds(apps, appId)),
      distinctUntilChanged()
    );
  }, [appState$, appId]);

  useEffect(() => {
    // macosApp$.subscribe(console.log);
  }, [macosApp$]);

  const open = () => {
    Store.update(appState$, (appState): IAppState => {
      return {
        ...appState,
        apps: appState.apps.map((app) =>
          app.id === appId ? { ...app, status: "opening" } : app
        ),
      };
    });

    setTimeout(() => {
      Store.update(appState$, (appState): IAppState => {
        const window = MacOSWindow.create({ appId });

        return {
          ...appState,
          apps: appState.apps.map((app) =>
            app.id === appId ? { ...app, status: "opened" } : app
          ),
          windows: {
            [window.id]: window,
          },
        };
      });
    }, 1000);

    // Promise.resolve().then(() => {
    //   Store.update(appState$, (appState): IAppState => {
    //     return {
    //       ...appState,
    //       apps: appState.apps.map((app) =>
    //         app.id === appId ? { ...app, status: "opened" } : app
    //       ),
    //     };
    //   });
    // });
  };

  const app = useExperimentalObserveState(macosApp$);

  return [app, { open }];
};
