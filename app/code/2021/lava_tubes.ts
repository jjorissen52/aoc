import { CodeRunner } from "~/code/container";
import { input_to_grid } from "~/code/2021/util";

type Height = number;
type Risk = number;
type Coord = { row: number; col: number };
// represents a grid boundary found in Basin.{up, right, left, down}
type Boundary = -1;
const isBoundary = (val: number): boolean => {
  switch (val) {
    case -1:
      return true;
    default:
      return false;
  }
};

class Basin {
  readonly rows: number;
  readonly cols: number;
  readonly heights: Height[];
  readonly risks: Risk[];
  lows: Coord[];
  in_basin: Set<number>;

  constructor(rows: number, cols: number, numbers: number[]) {
    this.rows = rows;
    this.cols = cols;
    this.heights = [...numbers];
    this.risks = this.heights.map((n) => n + 1);
    this.lows = [];
    this.in_basin = new Set<number>();
  }

  /***
   * Find all low points and sum their risk values. Keep track of low points along the way.
   */
  compute_risks(): number {
    this.lows = [];
    let total_risk = 0;
    for (let idx = 0; idx < this.heights.length; idx++) {
      const point_risk = this.point_risk(idx);
      if (point_risk) {
        this.lows.push(this.coords(idx));
        total_risk += point_risk;
      }
    }
    return total_risk;
  }

  /***
   * Given a low point, recursively computes the size of its basin.
   * @param idx idx corresponding to the current height
   */
  compute_basin_area(idx: number): number {
    let total_size = 0;
    if (!this.in_basin.has(idx)) {
      total_size += 1;
      this.in_basin.add(idx);
    }
    const next = [
      this.up(idx),
      this.right(idx),
      this.down(idx),
      this.left(idx),
    ].filter(
      (_idx) =>
        !isBoundary(_idx) &&
        this.heights[_idx as number] > this.heights[idx] &&
        !(this.heights[_idx as number] === 9)
    );
    next.forEach((_idx) => {
      total_size += this.compute_basin_area(_idx as number);
    });
    return total_size;
  }

  /*
   * Returns the risk associated with a point. Returns 0 if it's not a low point. */
  point_risk(idx: number): Risk {
    const is_low_point = [
      this.up(idx),
      this.right(idx),
      this.down(idx),
      this.left(idx),
    ]
      .filter((_idx) => !isBoundary(_idx))
      .every((_idx) => this.heights[_idx as number] > this.heights[idx]);
    return is_low_point ? this.risks[idx] : 0;
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
}

const build_basin = (input: string): Basin => {
  const { rows, cols, numbers } = input_to_grid(input);
  return new Basin(rows, cols, numbers);
};

export const LavaRiskRunner = new CodeRunner((input: string) => {
  const basin = build_basin(input);
  return String(basin.compute_risks());
});

export const LavaBasinRunner = new CodeRunner((input: string) => {
  const basin = build_basin(input);
  basin.compute_risks();
  const largest_basins = basin.lows
    .map((coord) => basin.compute_basin_area(basin.idx(coord.row, coord.col)))
    .sort((a, b) => (a > b ? -1 : 1))
    .slice(0, 3);
  return String(largest_basins.reduce((total, area) => total * area, 1));
});
