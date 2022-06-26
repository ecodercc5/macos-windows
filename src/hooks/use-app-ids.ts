import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { distinctUntilChanged, map } from "rxjs";
import { appIdsFromAppState } from "../core/app";
import { ReadState } from "../core/store";
import { useAppState } from "../providers/AppState";
import {
  useObserveState__,
  useObserveState_,
  useExperimentalObserveState,
} from "./use-observe-state";

const jsonCompare = <T>(a: T, b: T) => JSON.stringify(a) === JSON.stringify(b);

export const useAppIds = () => {
  const appState$ = useAppState();

  const appIds$ = useMemo(() => {
    return appState$.pipe(
      map(appIdsFromAppState),
      distinctUntilChanged(jsonCompare)
    );
  }, [appState$]);

  // const appIds = useObserveState(appIds$, jsonCompare);

  const appIds = useExperimentalObserveState(appIds$);

  return appIds;
};
