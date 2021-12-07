export type Solution = (input: string, ...auxInput: string[]) => string;

export class CodeRunner {
  func: Solution;

  constructor(func: Solution) {
    this.func = func.bind(this);
  }

  run(input: string, ...auxInput: string[]): string {
    return this.func(input, ...auxInput);
  }
}
