export const input_to_numbers = (
  input: string,
  sep: RegExp | string = /\s+/
): number[] => {
  return input
    .split(sep)
    .map((word) => word.match(/([0-9]+)/g)?.[0] ?? "")
    .map(parseFloat)
    .filter((v) => !isNaN(v));
};

export const partition = <T>(
  values: T[],
  predicate: (v: T) => boolean
): [T[], T[]] => {
  const matches = [] as T[];
  const no_match = [] as T[];
  values.forEach((v) => {
    if (predicate(v)) matches.push(v);
    else no_match.push(v);
  });
  return [matches, no_match];
};
