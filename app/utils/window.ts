/**
 * Do something with the window, if it's available.
 * @param fn
 */
export function withWindow<T>(fn: (arg: typeof window) => T): T | undefined {
  if (
    typeof window !== "undefined" &&
    typeof fn !== "undefined" &&
    typeof fn === "function"
  ) {
    return fn(window);
  }
}

/**
 * Attach given objects to the window, if available
 * @param payload
 */
export function attachToWindow(payload: Record<string, any>): void {
  withWindow((window) => {
    // @ts-ignore
    Object.keys(payload).forEach((key) => (window[key] = payload[key]));
  });
}
