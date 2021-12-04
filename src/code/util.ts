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
