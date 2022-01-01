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
// represents a grid boundary found in Basin.{up, right, left, down}
export type Boundary = -1;
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

  /*
   * Each of the methods below computes whether the point in the indicated direction
   * is larger that the given grid point.
   *   1. If a point is a boundary, that direction is always considered to be larger, e.g.,
   *      if we are the top row, then up always returns -1 (type of Boundary).*/
  up(i: number): number | Boundary {
    const { row, col } = this.coords(i);
    const irow = row - 1;
    if (irow < 0) return -1;
    return this.idx(irow, col);
  }

  right(i: number): number | Boundary {
    const { row, col } = this.coords(i);
    const icol = col + 1;
    if (icol > this.cols - 1) return -1;
    return this.idx(row, icol);
  }

  down(i: number): number | Boundary {
    const { row, col } = this.coords(i);
    const irow = row + 1;
    if (irow > this.rows - 1) return -1;
    return this.idx(irow, col);
  }

  left(i: number): number | Boundary {
    const { row, col } = this.coords(i);
    const icol = col - 1;
    if (icol < 0) return -1;
    return this.idx(row, icol);
  }

  draw(numbers: number[]): string {
    const matrix = <number[][]>[];
    numbers.forEach((number, idx) => {
      const { row } = this.coords(idx);
      if (matrix.length === row) matrix.push([] as number[]);
      matrix[row].push(number);
    });
    return matrix.map((row) => row.join("")).join("\n");
  }

  svg(
    numbers: number[],
    {
      highlights,
      scale = 14,
      font = 14,
    }: {
      highlights?: Map<number, string>;
      scale?: number;
      font?: number;
    } = {}
  ): string {
    const text = numbers.map((n, idx) => {
      const { row, col } = this.coords(idx);
      const scaled = [font + col * scale, font + row * scale];
      const fill =
        highlights && highlights.has(idx)
          ? highlights.get(idx)
            ? highlights.get(idx)
            : "white"
          : "grey";
      return `
        <text font-size="${font}"
              fill="${fill}"
              font-family="Verdana"
              text-anchor="middle"
              alignment-baseline="baseline"
              x="${scaled[0]}"
              y="${scaled[1]}">${n}</text>`;
    });
    return `<svg width="${this.cols * scale + font}" height="${
      this.rows * scale + font
    }" xmlns="http://www.w3.org/2000/svg">${text}</svg>`;
  }
}

export const isBoundary = (val: number): boolean => {
  switch (val) {
    case -1:
      return true;
    default:
      return false;
  }
};
