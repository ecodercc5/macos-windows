import { useEffect, useMemo } from "react";
import { distinctUntilChanged, map } from "rxjs";
import { appIdsFromAppState } from "../core/app";
import { useAppState } from "../providers/AppState";
import { useObserveState } from "./use-observe-state";

const jsonCompare = <T>(a: T, b: T) => JSON.stringify(a) === JSON.stringify(b);

export const useAppIds = () => {
  const appState$ = useAppState();

  const appIds$ = useMemo(() => {
    return appState$.pipe(
      map(appIdsFromAppState),
      distinctUntilChanged(jsonCompare)
    );
  }, [appState$]);

  const appIds = useObserveState(appIds$, jsonCompare);

  return appIds;
};
