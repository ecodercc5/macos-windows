import { useEffect, useRef, useState } from "react";
import { ReadState, Store } from "../core/store";

type Comparer = <T>(a: T, b: T) => boolean;

const strictEqual: Comparer = <T>(a: T, b: T) => a === b;

export const useObserveState = <T>(
  state$: ReadState<T>,
  comparer: Comparer = strictEqual
) => {
  const [state, setState] = useState(() => Store.get(state$));

  const stateRef = useRef(state);
  const comparerRef = useRef(comparer);

  stateRef.current = state;
  comparerRef.current = comparer;

  const firstEmit = useRef(true);

  useEffect(() => {
    const subscription = state$.subscribe((val) => {
      if (firstEmit.current) {
        if (!comparerRef.current(stateRef.current, val)) {
          setState(val);
        }

        firstEmit.current = false;
        return;
      }

      setState(val);
    });

    return () => subscription.unsubscribe();
  }, [state$]);

  return state;
};
