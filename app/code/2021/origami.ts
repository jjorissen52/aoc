import { CodeRunner, SolutionOutput } from "~/code/code_runner";
import { Coord, Grid } from "~/code/2021/util";

// @ts-ignore
class Paper extends Grid {
  marks: Set<number>;

  constructor(rows: number, cols: number, numbers: number[]) {
    super(rows, cols);
    this.marks = new Set([...numbers]);
  }

  static fromCoords(coords: Coord[]): Paper {
    const rows = Math.max(...coords.map(({ row }) => row)) + 1;
    const cols = Math.max(...coords.map(({ col }) => col)) + 1;
    const paper = new Paper(rows, cols, []);
    paper.marks = new Set(coords.map(({ row, col }) => paper.idx(row, col)));
    return paper;
  }

  display(): string {
    const output = <string[][]>[];
    for (let idx = 0; idx <= this.idx(this.rows - 1, this.cols - 1); idx++) {
      const { row } = this.coords(idx);
      if (row === output.length) output.push([]);
      output[row].push(this.marks.has(idx) ? "#" : ".");
    }
    return output.map((row) => row.join("")).join("\n");
  }

  svg(sizeScale = 10, dotScale = 10): string {
    const marks = Array.from(this.marks)
      .map((mark) => {
        const { row, col } = this.coords(mark);
        const scaled = [col * sizeScale, row * sizeScale];
        return `<rect x="${scaled[0]}" y="${scaled[1]}" width="${dotScale}" height="${dotScale}" fill="green"/>`;
      })
      .join("\n");
    return `<svg width="${this.cols * sizeScale + dotScale}" height="${
      this.rows * sizeScale + dotScale
    }" xmlns="http://www.w3.org/2000/svg">${marks}</svg>`;
  }

  transform({ x = 0, y = 0 }): Paper {
    if (x && y) {
      throw new Error("cannot transform both x and y at the same time.");
    }
    if (y) {
      this.marks = new Set(
        Array.from(this.marks).map((idx) => {
          const { row, col } = this.coords(idx);
          if (row < y) return idx;
          const newRow = y * 2 - row;
          return this.idx(newRow, col);
        })
      );
    } else if (x) {
      this.marks = new Set(
        Array.from(this.marks).map((idx) => {
          const { row, col } = this.coords(idx);
          if (col < x) return idx;
          const newCol = x * 2 - col;
          return this.idx(row, newCol);
        })
      );
    }
    return Paper.fromCoords(
      Array.from(this.marks).map((mark) => this.coords(mark))
    );
  }
}

const doOrigami = (input: string): Paper => {
  const coords = input
    .split("\n")
    .map((line) => {
      const [col, row] = line.split(",");
      return { row: parseInt(row), col: parseInt(col) };
    })
    .filter(({ row, col }) => !isNaN(row) && !isNaN(col));

  const transforms = input.split("\n").reduce((transforms, line) => {
    const match = line.match(/([xy])=([0-9]+)/);
    if (match) transforms.push({ [match[1]]: parseInt(match[2]) });
    return transforms;
  }, <Record<string, number>[]>[]);

  let paper = Paper.fromCoords(coords);
  transforms.forEach((t) => {
    paper = paper.transform(t);
  });
  return Paper.fromCoords(
    Array.from(paper.marks).map((mark) => paper.coords(mark))
  );
};

export const Origami = new CodeRunner((input: string, ...auxInput) => {
  const sizeScale = !isNaN(parseInt(auxInput[0])) ? parseInt(auxInput[0]) : 10;
  const dotScale = !isNaN(parseInt(auxInput[1])) ? parseInt(auxInput[1]) : 10;
  const paper = doOrigami(input);
  return new SolutionOutput(
    `${Array.from(paper.marks).length}:\n${paper.display()}`,
    paper.svg(sizeScale, dotScale)
  );
});
