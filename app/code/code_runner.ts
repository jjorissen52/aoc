export interface SolutionDisplay {
  toString(): string;
  toHTML(): string;
}

export type Solution = (
  input: string,
  ...auxInput: string[]
) => string | SolutionDisplay;

export class SolutionOutput implements SolutionDisplay {
  private readonly str: string;
  private readonly html: string;
  constructor(str: string, html?: string) {
    console.log(str);
    this.str = str;
    this.html = html ?? str.replace(/\n/g, "<br>");
  }
  toString(): string {
    return this.str;
  }
  toHTML(): string {
    return this.html;
  }
}

export class CodeRunner {
  func: Solution;

  constructor(func: Solution) {
    this.func = func.bind(this);
  }

  run(input: string, ...auxInput: string[]): SolutionDisplay {
    const solution = this.func(input, ...auxInput);
    if (typeof solution === "string") {
      return new SolutionOutput(solution);
    }
    return solution;
  }
}
