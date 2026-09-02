export function memoize<TArgs extends readonly unknown[], TResult>(
  fn: (...args: TArgs) => TResult
): (...args: TArgs) => TResult {
  const cache = new Map<string, TResult>();

  return (...args: TArgs): TResult => {
    const key: string = JSON.stringify(args);

    const cached: TResult | undefined = cache.get(key);

    if (cached !== undefined) {
      return cached;
    }

    const result: TResult = fn(...args);

    cache.set(key, result);

    return result;
  };
}
