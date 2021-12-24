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

export const input_to_grid = (input: string) => {
  const cols = Array.from(input.split(/\n/)[0]).length;
  const as_numbers = input.split(/\n/).reduce((numbers, line) => {
    return numbers.concat(
      Array.from(line)
        .map((n) => parseInt(n))
        .filter((n) => !isNaN(n))
    );
  }, [] as number[]);
  const rows = Math.floor(as_numbers.length / cols);
  return { cols, rows, numbers: as_numbers };
};

export const predicateDefault = <T>(
  value: T,
  predicate: (v: T) => boolean,
  fallback: T
) => {
  if (!predicate(value)) return fallback;
  return value;
};

export type Coord = { row: number; col: number };

export class Grid {
  rows: number;
  cols: number;

  constructor(rows: number, cols: number) {
    this.rows = rows;
    this.cols = cols;
  }

  coords(idx: number): Coord {
    const { cols } = this;
    const row = Math.floor(idx / cols);
    const col = idx % cols;
    return { row, col };
  }

  idx(row: number, col: number): number {
    return this.cols * row + col;
  }
}
