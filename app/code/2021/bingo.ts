import { CodeRunner } from "~/code/container";
import { input_to_numbers } from "./util";

type Row<T> = [T, T, T, T, T];
type Grid<T> = [Row<T>, Row<T>, Row<T>, Row<T>, Row<T>];
type Coord = { row: number; col: number };
class Board {
  private grid: Grid<number>;
  private marks: Grid<boolean>;
  private _won: number | null;

  constructor(numbers: number[]) {
    this._won = null;
    this.grid = Array(5)
      .fill([])
      .map((row) => row.map(() => 0)) as Grid<number>;
    this.marks = Array(5)
      .fill([])
      .map((row) => row.map(() => false)) as Grid<boolean>;
    numbers.forEach((num, idx) => {
      const [row, col] = this.coords(idx);
      this.grid[row][col] = num;
    });
  }

  coords(idx: number): [number, number] {
    const row = Math.floor(idx / 5);
    const col = idx % 5;
    return [row, col];
  }

  mark(number: number, coord?: Coord): Board {
    if (coord) {
      const { row, col } = coord;
      this.marks[row][col] = true;
      if (this.checkLines({ row, col })) {
        this._won = number;
      }
      return this;
    }
    for (let idx = 0; idx < 25; idx++) {
      const [row, col] = this.coords(idx);
      if (this.grid[row][col] === number) {
        this.mark(number, { row, col });
        break;
      }
    }
    return this;
  }

  get marked(): number[] {
    const marked = [];
    for (let idx = 0; idx < 25; idx++) {
      const [row, col] = this.coords(idx);
      if (this.marks[row][col]) marked.push(this.grid[row][col]);
    }
    return marked;
  }

  lines({ row, col }: Coord): Coord[][] {
    const lines = [[], []] as [Coord[], Coord[]];
    for (let ccol = 0; ccol < 5; ccol++) {
      lines[0].push({ row, col: ccol });
    }
    for (let rrow = 0; rrow < 5; rrow++) {
      lines[1].push({ row: rrow, col });
    }
    return lines;
  }

  checkLines({ row, col }: Coord): boolean {
    return this.lines({ row, col }).some((line) => {
      return line.every(({ row, col }) => this.marks[row][col]);
    });
  }

  get won(): boolean {
    return this._won !== null;
  }

  get score(): number {
    return (
      Array(25)
        .fill(0)
        .map((num, idx) => idx)
        .reduce((sum, idx) => {
          const [row, col] = this.coords(idx);
          if (!this.marks[row][col]) sum += this.grid[row][col];
          return sum;
        }, 0) * (this._won as number)
    );
  }
}

const bingo = (numbers: number[], _boards: number[][]): number => {
  const boards = _boards.map((b) => new Board(b));
  for (const number of numbers) {
    for (const board of boards) {
      board.mark(number);
      if (board.won) return board.score;
    }
  }
  return 0;
};

const on_second_thought = (numbers: number[], _boards: number[][]): number => {
  const boards = _boards.map((b) => new Board(b));
  const turns_to_win = boards.map(() => 0);
  for (let i = 0; i < boards.length; i++) {
    let turns = 0;
    for (const number of numbers) {
      turns += 1;
      boards[i].mark(number);
      turns_to_win[i] = turns;
      if (boards[i].won) break;
    }
  }
  return boards[turns_to_win.indexOf(Math.max(...turns_to_win))].score;
};

export const BingoRunner = new CodeRunner((input) => {
  const [_numbers, ..._boards] = input.split("\n\n");
  const numbers = input_to_numbers(_numbers, ",");
  const boards = _boards.map((board) => input_to_numbers(board));

  return String(bingo(numbers, boards));
});

export const BadBingoRunner = new CodeRunner((input) => {
  const [_numbers, ..._boards] = input.split("\n\n");
  const numbers = input_to_numbers(_numbers, ",");
  const boards = _boards.map((board) => input_to_numbers(board));

  return String(on_second_thought(numbers, boards));
});
