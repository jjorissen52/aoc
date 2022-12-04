export function sum<T extends number>(items: T[]): number;
/**
 * Maximum of array or variadic inputs
 * @param v first value or array
 * @param items variadic values
 *
 * @example
 * ```
 * sum([1,2,3]) === sum(1,2,3)
 * ```
 */
export function sum<T extends number>(v: T | T[], ...items: T[]): number {
  if (Array.isArray(v)) return v.reduce((total, item) => total + item, 0);
  return items.reduce((total, item) => total + item, v as number);
}

export function max<T extends number>(items: T[]): number;
/**
 * Maximum of array or variadic inputs
 * @param v first value or array
 * @param items variadic values
 *
 * @example
 * ```
 * max([1,2,3]) === max(1,2,3)
 * ```
 */
export function max<T extends number>(v: T | T[], ...items: T[]): number {
  if (Array.isArray(v)) return Math.max(...v);
  return Math.max(v, ...items);
}

/**
 * Parse input as int, use instead of parseInt so you don't have to worry about
 * the radix argument that you will never use
 * @param s input string
 * @return int
 *
 * @example
 * ```ts
 * // totally safe!
 * ["1","2","3"].map(atoi)
 * // totally bad because the index argument is used a radix!
 * ["1","2","3"].map(parseInt)
 * ```
 */
export const atoi = (s: string): number => parseInt(s);

/**
 * Parse input as float (float counterpart to atoi, though there isn't any
 * reason not to just use parseFloat)
 * @param s input string
 * @return int
 */
export const atof = (s: string): number => parseFloat(s);

/**
 * Given a predicate, return a function that does the opposite
 * @param predicate function to invert
 */
export function invert<T extends (...args: any) => boolean>(predicate: T): T {
  return ((...args) => !predicate(...args)) as T;
}

/**
 * Return top n items
 * @param items
 * @param n
 * @param cmp
 */
export function take<T>(
  items: T[],
  n: number,
  cmp: (a: T, b: T) => -1 | 0 | 1 = (a, b) => (a > b ? -1 : 1)
): T[] {
  const arr = [...items];
  return arr.sort(cmp).slice(0, n);
}
