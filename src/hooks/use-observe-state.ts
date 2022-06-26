import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Subscription } from "rxjs";
import { ReadState, State, Store } from "../core/store";

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

// test this thingy later
export const useObserveState_ = <T>(state$: ReadState<T>): T => {
  const [, setState] = useState({});

  // store the current value of the observable
  const valueRef = useRef<T>();

  const prevState$Ref = useRef<ReadState<T>>();

  // store the current subscription -> so we can subscribe on unmount
  const subscriptionRef = useRef<Subscription | undefined>();

  // initial mount
  const isInitMount = useRef(true);

  // re-render when we get new value from subscription
  const forceRerender = useCallback(() => setState({}), []);

  // remove subscription when component dismounts
  useEffect(() => {
    return () => subscriptionRef.current?.unsubscribe();
  }, []);

  // if new state$
  if (state$ !== prevState$Ref.current) {
    // console.log("mook");

    // unsubscribe from previous subscription
    if (subscriptionRef.current) {
      subscriptionRef.current.unsubscribe();
    }

    // create new subscription
    const subscription = state$.subscribe((value) => {
      // set value to ref

      valueRef.current = value;

      if (isInitMount.current) {
      } else {
        // force re-render on subsequent subscription

        forceRerender();
      }
    });

    // set the new subscription so we can subscribe if need be
    subscriptionRef.current = subscription;
  } else {
    console.log("cuz of re-render");
    console.log(valueRef);
  }

  isInitMount.current = false;
  prevState$Ref.current = state$;

  return valueRef.current!;
};

export const useObserveState__ = <T>(state$: ReadState<T>): T => {
  const [state, setState] = useState<T>();

  // store the current value of the observable
  const valueRef = useRef<T>();

  const prevState$Ref = useRef<ReadState<T>>();

  // store the current subscription -> so we can subscribe on unmount
  const subscriptionRef = useRef<Subscription | undefined>();

  // initial mount
  const renderRef = useRef(0);

  // remove subscription when component dismounts
  useEffect(() => {
    return () => subscriptionRef.current?.unsubscribe();
  }, []);

  // if new state$
  if (state$ !== prevState$Ref.current) {
    console.log("mook");

    // unsubscribe from previous subscription
    if (subscriptionRef.current) {
      subscriptionRef.current.unsubscribe();
    }

    // create new subscription
    valueRef.current = Store.get(state$);

    console.log(valueRef.current);

    const subscription = state$.subscribe((value) => {
      valueRef.current = value;

      console.log(value);

      if (renderRef.current === 0) {
        // isInitMount.current = false;
      } else {
        console.log("setting state");
        console.log(value);
        setState(value);
      }
    });

    // set the new subscription so we can subscribe if need be
    subscriptionRef.current = subscription;
  }

  prevState$Ref.current = state$;

  // console.log(render.current);
  renderRef.current++;

  return state || valueRef.current!;
};

export const useExperimentalObserveState = <T>(state$: ReadState<T>) => {
  const [state, setState] = useState<T>(() => Store.get(state$));

  useEffect(() => {
    const subscription = state$.subscribe(setState);

    return () => subscription.unsubscribe();
  }, [state$]);

  return state;
};
