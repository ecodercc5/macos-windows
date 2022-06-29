import { BehaviorSubject, Observable } from "rxjs";

export type State<T> = BehaviorSubject<T>;
export type ReadState<T> = Observable<T>;

export namespace Store {
  export const create = <T>(initialValue: T): State<T> =>
    new BehaviorSubject(initialValue);

  export const get = <T>(state: ReadState<T>): T => {
    if (state instanceof BehaviorSubject) {
      return state.getValue() as T;
    }

    let value: T;

    state.subscribe((current) => (value = current)).unsubscribe();

    return value!;
  };

  export const set = <T>(state: State<T>, value: T) => {
    console.log("[setting]");

    return state.next(value);
  };

  export const update = <T>(state: State<T>, updater: (prev: T) => T) => {
    const value = updater(state.getValue());

    return set(state, value);
  };

  export const modify = <T, K>(
    readState: ReadState<T>,
    state: State<K>,
    updater: (a: T, b: K) => K
  ) => {
    const readStateValue = get(readState);
    const stateValue = get(state);

    const newStateValue = updater(readStateValue, stateValue);

    return set(state, newStateValue);
  };
}
