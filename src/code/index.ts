import raw from "raw.macro";

import { CodeRunner } from "./container";
import { SlidingSonarRunner } from "./sliding_sonar";
import { SonarRunner } from "./sonar";
import { DiveRunner } from "./dive";
import { AccurateDiveRunner } from "./accurate_dive";
import { PowerConsumptionRunner } from "./power_consumption";
import { LifeSupportRunner } from "./life_support";

export type RunnerOption = {
  day: number;
  title: string;
  content: string;
  link: string;
  runner: CodeRunner;
};

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
];
