import { Grid, input_to_grid, isBoundary } from "./util";
import { CodeRunner, SolutionOutput } from "~/code/code_runner";

const get =
  <K, V>(map: Map<K, V>) =>
  (key: K, fallback: V) =>
    (map.has(key) ? map.get(key) : fallback) as V;

const time = (): number => new Date().getTime() / 1000;

class Dijkstra extends Grid {
  // index corresponding to the starting point
  readonly start: number;
  // index corresponding to the destination
  readonly end: number;
  // array of "distances"; in this case we can treat the cost to enter the square as its distance
  readonly dist: number[];
  // set of indices corresponding to unvisited squares
  private unvisited: Set<number>;
  // record of each visited square and the minimum distance required to reach it
  readonly minimums: Map<number, number>;
  // minimum distance path to each node
  readonly paths: Map<number, number[]>;

  constructor(rows: number, cols: number, numbers: number[]) {
    super(rows, cols);
    this.start = 0;
    this.end = numbers.length - 1;
    this.dist = [...numbers];
    this.unvisited = new Set(numbers.map((_, idx) => idx));
    // we have visited this.start at zero distance; any other minimum should
    // default to Infinity until we've seen it as a neighbor at least once
    this.minimums = new Map(
      [<[number, number]>[0, 0]].concat(
        <[number, number][]>(
          numbers.slice(1).map((_, idx) => [idx + 1, Infinity])
        )
      )
    );
    this.paths = new Map<number, number[]>([[0, [0]]]);
  }

  unvisitedNeighbors(idx: number): number[] {
    return [this.up(idx), this.right(idx), this.down(idx), this.left(idx)]
      .filter((neighbor) => !isBoundary(neighbor))
      .filter((neighbor) => this.unvisited.has(neighbor));
  }

  travel(): { path: number[]; distance: number } {
    const max = 100_000;
    let position = this.start;
    let count = 0;
    while (position !== this.end && count < max) {
      const path = this.paths.get(position) ?? [0];
      this.unvisited.delete(position);
      const distanceToPosition = get(this.minimums)(position, Infinity);
      const neighbors = this.unvisitedNeighbors(position);
      neighbors.forEach((neighborPosition) => {
        const edgeDistance = this.dist[neighborPosition];
        const neighborOldMinimum = get(this.minimums)(
          neighborPosition,
          Infinity
        );
        const neighborMinimum = Math.min(
          distanceToPosition + edgeDistance,
          neighborOldMinimum
        );
        if (neighborMinimum < neighborOldMinimum) {
          this.paths.set(neighborPosition, [...path, neighborPosition]);
          this.minimums.set(neighborPosition, neighborMinimum);
        }
      });
      position =
        Array.from(this.unvisited)
          .map((uv) => [uv, get(this.minimums)(uv, Infinity)])
          .sort((a, b) => {
            return a[1] < b[1] ? -1 : 1;
          })[0]?.[0] ?? 0;
      count += 1;
    }
    const distance =
      count === max ? -1 : get(this.minimums)(this.end, Infinity);

    return { path: get(this.paths)(this.end, []), distance };
  }
}

const run = (
  transform: (
    props: ReturnType<typeof input_to_grid>
  ) => ReturnType<typeof input_to_grid>,
  input: string,
  ...auxInput: string[]
) => {
  let scale = !isNaN(parseInt(auxInput[0])) ? parseInt(auxInput[0]) : 14;
  const fontSize = !isNaN(parseInt(auxInput[1])) ? parseInt(auxInput[1]) : 14;
  if (scale < fontSize) scale = fontSize;

  const { rows, cols, numbers } = transform(input_to_grid(input));
  const dijkstra = new Dijkstra(rows, cols, numbers);
  const computeStart = time();
  const { path, distance } = dijkstra.travel();
  const highlights = new Map(path.map((idx) => [idx, "white"]));
  const computeEnd = time();
  const html = dijkstra.svg(numbers, { scale, font: fontSize, highlights });
  const drawEnd = time();
  return new SolutionOutput(
    `distance: ${distance}\n` +
      `compute time: ${(computeEnd - computeStart).toFixed(2)}s\n` +
      `draw time: ${(drawEnd - computeEnd).toFixed(2)}s\n`,
    html
  );
};

export const DijkstraRunner = new CodeRunner((input: string, ...auxInput) => {
  const transform = (props: ReturnType<typeof input_to_grid>) => props;

  return run(transform, input, ...auxInput);
});

export const BigDijkstraRunner = new CodeRunner(
  (input: string, ...auxInput) => {
    const transform = ({
      rows,
      cols,
      numbers,
    }: ReturnType<typeof input_to_grid>) => {
      const [newRows, newCols] = [rows * 5, cols * 5];
      const newNumbers = Array(newRows * newCols).fill(NaN);

      // grid to keep track of which modifier applies to the current
      // coordinate
      const modifierGrid = new Grid(5, 5);
      const modifiers = Array(25).fill(NaN);
      modifiers[0] = 0;
      for (let i = 1; i < 25; i++) {
        const [left, up] = [modifierGrid.left(i), modifierGrid.up(i)];
        if (!isBoundary(left)) modifiers[i] = modifiers[left] + 1;
        else modifiers[i] = modifiers[up] + 1;
      }

      // grids to transform coordinates to indexes for the old and new grids
      const oldEmptyGrid = new Grid(rows, cols);
      const newEmptyGrid = new Grid(newRows, newCols);
      for (let row = 0; row < newRows; row++) {
        for (let col = 0; col < newCols; col++) {
          const [oldRow, oldCol] = [row % rows, col % cols];
          const tile = modifierGrid.idx(
            Math.floor(row / rows),
            Math.floor(col / cols)
          );
          const modifier = modifiers[tile];
          const oldIdx = oldEmptyGrid.idx(oldRow, oldCol);
          const newIdx = newEmptyGrid.idx(row, col);
          newNumbers[newIdx] = (numbers[oldIdx] + modifier) % 9 || 9;
        }
      }

      return {
        rows: newRows,
        cols: newCols,
        numbers: newNumbers,
      };
    };

    return run(transform, input, ...auxInput);
  }
);
