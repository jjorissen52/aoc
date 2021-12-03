export type Solution = (input: string) => string;

export class CodeRunner {
  func: Solution;

  constructor(func: Solution) {
    this.func = func.bind(this);
  }

  run(input: string): string {
    return this.func(input);
  }
}
