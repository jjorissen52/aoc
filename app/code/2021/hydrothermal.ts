import { CodeRunner } from "~/code/code_runner";

class Point {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

const slope = (p1: Point, p2: Point): number => (p2.y - p1.y) / (p2.x - p1.x);
class Line {
  p1: Point;
  p2: Point;

  constructor(p1: Point, p2: Point) {
    this.p1 = p1;
    this.p2 = p2;
  }

  get slope(): number {
    const { p1, p2 } = this;
    return slope(p1, p2);
  }

  draw(diagonals = false): Point[] {
    const { p1, p2 } = this;
    if (
      !(
        p1.x === p2.x ||
        p1.y === p2.y ||
        (diagonals && Math.abs(this.slope) === 1)
      )
    )
      return [];
    const points = [];
    if (diagonals && Math.abs(this.slope) === 1) {
      const [start, end] = p1.x < p2.x ? [p1, p2] : [p2, p1];
      const _slope = slope(start, end);
      for (let { x, y } = start; x <= end.x; x++) {
        points.push(new Point(x, y));
        y += _slope;
      }
    } else if (p1.y === p2.y) {
      const { y } = p1;
      for (let x = Math.min(p1.x, p2.x); x <= Math.max(p1.x, p2.x); x++) {
        points.push(new Point(x, y));
      }
    } else {
      const { x } = p1;
      for (let y = Math.min(p1.y, p2.y); y <= Math.max(p1.y, p2.y); y++) {
        points.push(new Point(x, y));
      }
    }
    return points;
  }
}

type Pair = [Point, Point];
class Plot {
  grid: Record<string, number>;

  constructor(pairs: Pair[], diagonals = false) {
    this.grid = pairs.reduce((accum, [p1, p2]) => {
      new Line(p1, p2).draw(diagonals).forEach(({ x, y }) => {
        const coord = String([x, y]);
        if (accum[coord]) accum[coord] += 1;
        else accum[coord] = 1;
      });
      return accum;
    }, {} as Record<string, number>);
  }
}

const multiple_overlap = (pairs: Pair[], diagonals = false): number => {
  const plot = new Plot(pairs, diagonals);
  return Object.entries(plot.grid).filter((coord) => coord[1] > 1).length;
};

const to_pairs = (input: string): Pair[] =>
  input
    .split("\n")
    .map((line) => {
      const [p1, p2] = line.split(" -> ");
      return [...(p1 ?? ",").split(","), ...(p2 ?? ",").split(",")].map(
        parseFloat
      );
    })
    .filter((pairs) => pairs.every((coord) => !isNaN(coord)))
    .map(
      ([p1x, p1y, p2x, p2y]) =>
        [new Point(p1x, p1y), new Point(p2x, p2y)] as Pair
    );

export const HydroThermal = new CodeRunner((input) => {
  return String(multiple_overlap(to_pairs(input)));
});

export const MoreHydroThermal = new CodeRunner((input) => {
  return String(multiple_overlap(to_pairs(input), true));
});
