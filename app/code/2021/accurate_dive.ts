import { CodeRunner } from "~/code/code_runner";
import { input_to_vectors, Submarine } from "./dive";

class AccurateSubmarine extends Submarine {
  aim: number;

  constructor(x = 0, y = 0, aim = 0) {
    super(x, y);
    this.aim = aim;
  }

  forward(n: number) {
    super.forward(n);
    this.y += this.aim * n;
    return this;
  }

  up(n: number) {
    this.aim -= n;
    return this;
  }

  down(n: number) {
    this.aim += n;
    return this;
  }
}

export const AccurateDiveRunner = new CodeRunner(
  (input: string) => {
    const as_vectors = input_to_vectors(input);
    return String(new AccurateSubmarine().dive(as_vectors));
  },
  2021,
  {
    day: 2,
    title: "Accurate Dive",
    file: "accurate_dive",
  }
);
