import memoize from "memoizee";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { distinctUntilChanged, map } from "rxjs";
import { appIdsFromAppState } from "../core/app";
import { ReadState } from "../core/store";
import { IApp } from "../core/types";
import { useAppState } from "../providers/AppState";
import {
  useObserveState__,
  useObserveState_,
  useExperimentalObserveState,
} from "./use-observe-state";

const jsonCompare = <T>(a: T, b: T) => JSON.stringify(a) === JSON.stringify(b);

const getAppIds = memoize((apps: IApp[]) => {
  return apps.map((app) => app.id);
});

export const useAppIds = () => {
  const appState$ = useAppState();

  const appIds$ = useMemo(() => {
    return appState$.pipe(
      map((appState) => getAppIds(appState.apps)),
      distinctUntilChanged(jsonCompare)
    );
  }, [appState$]);

  return useExperimentalObserveState(appIds$);
};
