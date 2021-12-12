import { CodeRunner } from "~/code/container";
import { input_to_grid } from "~/code/2021/util";

type Coord = { row: number; col: number };
// represents a grid boundary
const isBoundary = ({ row, col }: Coord): boolean => {
  return row === -1 || col === -1;
};

class Grid {
  readonly rows: number;
  readonly cols: number;
  readonly energy: number[];
  private next_flash: Set<number>;

  constructor(rows: number, cols: number, numbers: number[]) {
    this.rows = rows;
    this.cols = cols;
    this.energy = [...numbers];
    this.next_flash = new Set();
  }

  tick() {
    this.energy.forEach((num, idx) => {
      this.energize(idx);
    });
    const flashes = Array.from(this.next_flash);
    flashes.forEach((idx) => {
      this.energy[idx] = 0;
    });
    this.next_flash = new Set();
    return flashes.length;
  }

  energize(idx: number) {
    if (this.energy[idx] > 9) return;
    this.energy[idx] += 1;
    if (this.energy[idx] > 9) {
      this.next_flash.add(idx);
      [
        this.north,
        this.ne,
        this.east,
        this.se,
        this.south,
        this.sw,
        this.west,
        this.nw,
      ]
        .map((m) => m.call(this, this.coords(idx)))
        .filter((c) => !isBoundary(c))
        .forEach((c) => {
          this.energize(this.idx(c.row, c.col));
        });
    }
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
   * Each of the methods below returns a coordinate corresponding to the
   * cardinal direction increase relative to the passed coordinate.
   * */
  north({ row, col }: Coord): Coord {
    const irow = row - 1;
    if (irow < 0) return { row: -1, col };
    return { row: irow, col };
  }

  ne(coord: Coord): Coord {
    const { row } = this.north(coord);
    const { col } = this.east(coord);
    return { row, col };
  }

  east({ row, col }: Coord): Coord {
    const icol = col + 1;
    if (icol > this.cols - 1) return { row, col: -1 };
    return { row, col: icol };
  }

  se(coord: Coord): Coord {
    const { row } = this.south(coord);
    const { col } = this.east(coord);
    return { row, col };
  }

  south({ row, col }: Coord): Coord {
    const irow = row + 1;
    if (irow > this.rows - 1) return { row: -1, col };
    return { row: irow, col };
  }

  sw(coord: Coord): Coord {
    const { row } = this.south(coord);
    const { col } = this.west(coord);
    return { row, col };
  }

  west({ row, col }: Coord): Coord {
    const icol = col - 1;
    if (icol < 0) return { row, col: -1 };
    return { row, col: icol };
  }

  nw(coord: Coord): Coord {
    const { row } = this.north(coord);
    const { col } = this.west(coord);
    return { row, col };
  }
}

const build = (input: string): Grid => {
  const { rows, cols, numbers } = input_to_grid(input);
  return new Grid(rows, cols, numbers);
};

export const CountFlashRunner = new CodeRunner(
  (input: string, stepInput: string) => {
    const steps = !isNaN(parseInt(stepInput)) ? parseInt(stepInput) : 100;
    let total_flashes = 0;
    const grid = build(input);
    for (let idx = 0; idx < steps; idx++) {
      total_flashes += grid.tick();
    }
    return String(total_flashes);
  }
);

export const SyncFlashRunner = new CodeRunner((input: string, maxStepInput) => {
  const maxSteps = !isNaN(parseInt(maxStepInput))
    ? parseInt(maxStepInput)
    : 10_000;
  const grid = build(input);
  let step = 1;
  let flashes = grid.tick();
  while (flashes < grid.energy.length && step < maxSteps) {
    flashes = grid.tick();
    console.log(flashes);
    step += 1;
  }
  return String(step);
});
