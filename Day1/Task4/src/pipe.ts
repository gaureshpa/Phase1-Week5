type UnaryFunction<T, R> = (value: T) => R;

export function pipe<T>(
  ...functions: Array<UnaryFunction<T, T>>
): (value: T) => T {
  return (value: T): T => {
    return functions.reduce(
      (result: T, fn: UnaryFunction<T, T>): T => {
        return fn(result);
      },
      value
    );
  };
}
