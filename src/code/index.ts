import { CodeRunner } from "./container";
import { SlidingSonarRunner } from "./sliding_sonar";
import { SonarRunner } from "./sonar";
import { DiveRunner } from "./dive";
import { AccurateDiveRunner } from "./accurate_dive";
import { PowerConsumptionRunner } from "./power_consumption";
import { LifeSupportRunner } from "./life_support";
import { BingoRunner } from "./bingo";
import { BadBingoRunner } from "./bingo";
import { HydroThermal, MoreHydroThermal } from "./hydrothermal";

export type RunnerOption = {
  day: number;
  title: string;
  content: string;
  link: string;
  runner: CodeRunner;
};

// eslint-disable-next-line
let raw = require("raw.macro");
try {
  // when bundling for browser
  raw("../code/sonar.ts");
} catch (e) {
  // eslint-disable-next-line
  const fs = require("fs");
  // when running on cli
  raw = (path: string) => {
    const src_relative_path = `./src/${path.slice(3)}`;
    return fs.readFileSync(src_relative_path, "utf-8");
  };
}

export const runners: RunnerOption[] = [
  {
    day: 1,
    title: "Sonar",
    runner: SonarRunner,
    content: raw("../code/sonar.ts"),
    link: "https://adventofcode.com/2021/day/1",
  },
  {
    day: 1,
    title: "Sliding Sonar",
    runner: SlidingSonarRunner,
    content: raw("../code/sliding_sonar.ts"),
    link: "https://adventofcode.com/2021/day/1#part2",
  },
  {
    day: 2,
    title: "Dive",
    runner: DiveRunner,
    content: raw("../code/dive.ts"),
    link: "https://adventofcode.com/2021/day/2",
  },
  {
    day: 2,
    title: "Accurate Dive",
    runner: AccurateDiveRunner,
    content: raw("../code/accurate_dive.ts"),
    link: "https://adventofcode.com/2021/day/2#part2",
  },
  {
    day: 3,
    title: "Power Consumption",
    runner: PowerConsumptionRunner,
    content: raw("../code/power_consumption.ts"),
    link: "https://adventofcode.com/2021/day/3",
  },
  {
    day: 3,
    title: "Life Support",
    runner: LifeSupportRunner,
    content: raw("../code/life_support.ts"),
    link: "https://adventofcode.com/2021/day/3#part2",
  },
  {
    day: 4,
    title: "Bingo",
    runner: BingoRunner,
    content: raw("../code/bingo.ts"),
    link: "https://adventofcode.com/2021/day/4",
  },
  {
    day: 4,
    title: "Bad Bingo",
    runner: BadBingoRunner,
    content: raw("../code/bingo.ts"),
    link: "https://adventofcode.com/2021/day/4#part2",
  },
  {
    day: 5,
    title: "Hydro Thermal",
    runner: HydroThermal,
    content: raw("../code/hydrothermal.ts"),
    link: "https://adventofcode.com/2021/day/5",
  },
  {
    day: 5,
    title: "More Hydro Thermal",
    runner: MoreHydroThermal,
    content: raw("../code/hydrothermal.ts"),
    link: "https://adventofcode.com/2021/day/5#part2",
  },
];
