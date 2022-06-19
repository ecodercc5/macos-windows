import { BehaviorSubject, distinctUntilChanged, map, Observable } from "rxjs";

type ReadonlyState<T> = Observable<T>;

type Setter<T> = (prev: T) => T;

interface IState<T> {
  get(): T;
  set(value: T | Setter<T>): void;
  value$(): ReadonlyState<T>;
}

const isSetter = <T>(value: T | Setter<T>): value is Setter<T> => {
  return typeof value === "function";
};

export const state = <T>(initialState: T): IState<T> => {
  const $ = new BehaviorSubject(initialState);
  const observable$ = $.asObservable().pipe(distinctUntilChanged());

  const get: IState<T>["get"] = () => $.getValue();
  const set: IState<T>["set"] = (value) => {
    if (isSetter(value)) {
      return $.next(value(get()));
    }

    return $.next(value);
  };

  const value$: IState<T>["value$"] = () => observable$;

  return {
    get,
    set,
    value$,
  };
};

export const get = <T>(readonlyState: ReadonlyState<T>) => {
  let value: T;
  readonlyState.subscribe((val) => (value = val)).unsubscribe();

  return value!;
};

export const lense = <T, K>(
  state: IState<T> | ReadonlyState<T>,
  mapper: (prev: T) => K
): ReadonlyState<K> => {
  if (state instanceof Observable) {
    return state.pipe(map(mapper));
  }

  return state.value$().pipe(map(mapper));
};

export const set = <T, K>(
  state: IState<T>,
  readonly: ReadonlyState<K>,
  setter: (values: [T, K]) => T
) => {
  const stateValue = state.get();
  const readonlyValue = get(readonly);

  const nextValue = setter([stateValue, readonlyValue]);

  return state.set(nextValue);
};

const number = state<number>(26);
const numberLense = lense(number, (value) => value * 2);

numberLense.subscribe(console.log);

set(number, numberLense, ([, numLenseValue]) => (numLenseValue + 2) / 2);
