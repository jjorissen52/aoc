import { Grid, input_to_grid, isBoundary } from "./util";
import { CodeRunner, SolutionOutput } from "~/code/code_runner";
import { HeapQ } from "~/utils/heapq";

const get =
  <K, V>(map: Map<K, V>) =>
  (key: K, fallback: V) =>
    (map.has(key) ? map.get(key) : fallback) as V;

const time = (): number => new Date().getTime() / 1000;

class Dijkstra extends Grid {
  readonly dist: number[];
  // record of each visited square and the minimum distance required to reach it
  readonly minimums: Map<number, number>;
  // minimum distance path to each node
  readonly paths: Map<number, number>;
  readonly queue: HeapQ<[number, number]>;

  constructor(rows: number, cols: number, numbers: number[]) {
    super(rows, cols);
    this.dist = [...numbers];
    this.minimums = new Map();
    this.paths = new Map();
    this.queue = new HeapQ<[number, number]>((a, b) => a[1] < b[1]);
  }

  neighbors(idx: number): number[] {
    return [
      this.up(idx),
      this.right(idx),
      this.down(idx),
      this.left(idx),
    ].filter((neighbor) => !isBoundary(neighbor));
  }

  travel(start: number, end: number): { path: number[]; distance: number } {
    this.queue.push([start, 0]);
    this.minimums.set(start, 0);
    while (this.queue.length > 0) {
      const [position, distanceToPosition] = this.queue.pop();
      // only possible if this position ended up in the heap twice
      if (distanceToPosition > get(this.minimums)(position, Infinity)) continue;
      this.neighbors(position).forEach((neighborPosition) => {
        const edgeDistance = this.dist[neighborPosition];
        const neighborOldMinimum = get(this.minimums)(
          neighborPosition,
          Infinity
        );
        const neighborMinimum = distanceToPosition + edgeDistance;
        if (neighborMinimum < neighborOldMinimum) {
          this.paths.set(neighborPosition, position);
          this.minimums.set(neighborPosition, neighborMinimum);
          this.queue.push([neighborPosition, neighborMinimum]);
        }
      });
      // can stop when we reach the end
      if (position === end) break;
    }
    const distance = get(this.minimums)(end, Infinity);
    const path = [end];
    for (let parent = get(this.paths)(end, -1); parent !== -1; ) {
      path.push(parent);
      parent = get(this.paths)(parent, -1);
    }

    return { path: path.reverse(), distance };
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
  if (!numbers.length) return "No Input?";
  const dijkstra = new Dijkstra(rows, cols, numbers);
  const computeStart = time();
  const { path, distance } = dijkstra.travel(0, numbers.length - 1);
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
