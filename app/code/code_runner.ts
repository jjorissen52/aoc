import { RunnerOption } from "~/components/IO";

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

export const RUNNER_MAP: Record<number, RunnerOption[]> = {};
export class CodeRunner {
  func: Solution;

  constructor(
    func: Solution,
    year: number,
    { day, title, file, auxInputs }: Omit<RunnerOption, "runner">
  ) {
    this.func = func.bind(this);
    const asOption = { day, title, file, auxInputs, runner: this };
    if (RUNNER_MAP[year]) RUNNER_MAP[year].push(asOption);
    else RUNNER_MAP[year] = [asOption];
  }

  run(input: string, ...auxInput: string[]): SolutionDisplay {
    const solution = this.func(input, ...auxInput);
    if (typeof solution === "string") {
      return new SolutionOutput(solution);
    }
    return solution;
  }
}
