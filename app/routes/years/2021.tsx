import React from "react";
import { useLoaderData } from "@remix-run/react";
import { RunnerOption } from "~/@types/global";
import { SonarRunner } from "~/code/2021/sonar";
import { SlidingSonarRunner } from "~/code/2021/sliding_sonar";
import { DiveRunner } from "~/code/2021/dive";
import { AccurateDiveRunner } from "~/code/2021/accurate_dive";
import { PowerConsumptionRunner } from "~/code/2021/power_consumption";
import { LifeSupportRunner } from "~/code/2021/life_support";
import { BadBingoRunner, BingoRunner } from "~/code/2021/bingo";
import { HydroThermal, MoreHydroThermal } from "~/code/2021/hydrothermal";
import CodeFrame from "~/components/CodeFrame";
import { yearLoader } from "~/utils/loaders";
import { FastLanternFish, SlowLanternFish } from "~/code/2021/lanternfish";
import { ComplexCrabRunner, CrabRunner } from "~/code/2021/crabs";
import { FullDigitRunner, SimpleDigitRunner } from "~/code/2021/digits";
import { LavaBasinRunner, LavaRiskRunner } from "~/code/2021/lava_tubes";
import { AutocompleteRunner, SyntaxRunner } from "~/code/2021/syntax";
import { CountFlashRunner, SyncFlashRunner } from "~/code/2021/octopi";
import { PathRunner } from "~/code/2021/pathing";
import { Origami } from "~/code/2021/origami";
import { FastPolymerizer, SlowPolymerizer } from "~/code/2021/polymerization";
import { BigDijkstraRunner, DijkstraRunner } from "~/code/2021/dijkstra";

export const runners: RunnerOption[] = [
  {
    day: 1,
    title: "Sonar",
    file: "sonar",
    runner: SonarRunner,
    link: "https://adventofcode.com/2021/day/1",
  },
  {
    day: 1,
    title: "Sliding Sonar",
    file: "sliding_sonar",
    runner: SlidingSonarRunner,
    link: "https://adventofcode.com/2021/day/1#part2",
  },
  {
    day: 2,
    title: "Dive",
    file: "dive",
    runner: DiveRunner,
    link: "https://adventofcode.com/2021/day/2",
  },
  {
    day: 2,
    title: "Accurate Dive",
    file: "accurate_dive",
    runner: AccurateDiveRunner,
    link: "https://adventofcode.com/2021/day/2#part2",
  },
  {
    day: 3,
    title: "Power Consumption",
    file: "power_consumption",
    runner: PowerConsumptionRunner,
    link: "https://adventofcode.com/2021/day/3",
  },
  {
    day: 3,
    title: "Life Support",
    file: "life_support",
    runner: LifeSupportRunner,
    link: "https://adventofcode.com/2021/day/3#part2",
  },
  {
    day: 4,
    title: "Bingo",
    file: "bingo",
    runner: BingoRunner,
    link: "https://adventofcode.com/2021/day/4",
  },
  {
    day: 4,
    title: "Bad Bingo",
    file: "bingo",
    runner: BadBingoRunner,
    link: "https://adventofcode.com/2021/day/4#part2",
  },
  {
    day: 5,
    title: "Hydro Thermal",
    file: "hydrothermal",
    runner: HydroThermal,
    link: "https://adventofcode.com/2021/day/5",
  },
  {
    day: 5,
    title: "More Hydro Thermal",
    file: "hydrothermal",
    runner: MoreHydroThermal,
    link: "https://adventofcode.com/2021/day/5#part2",
  },
  {
    day: 6,
    title: "Lantern Fish",
    file: "lanternfish",
    runner: SlowLanternFish,
    link: "https://adventofcode.com/2021/day/6",
    auxInputs: [{ name: "Days", default: "80" }],
  },
  {
    day: 6,
    title: "Fast Lantern Fish",
    file: "lanternfish",
    runner: FastLanternFish,
    link: "https://adventofcode.com/2021/day/6",
    auxInputs: [{ name: "Days", default: "256" }],
  },
  {
    day: 7,
    title: "Crabs",
    file: "crabs",
    runner: CrabRunner,
    link: "https://adventofcode.com/2021/day/7",
  },
  {
    day: 7,
    title: "Complex Crabs",
    file: "crabs",
    runner: ComplexCrabRunner,
    link: "https://adventofcode.com/2021/day/7#part2",
  },
  {
    day: 8,
    title: "Easy Digits",
    file: "digits",
    runner: SimpleDigitRunner,
    link: "https://adventofcode.com/2021/day/8",
  },
  {
    day: 8,
    title: "Full Digits",
    file: "digits",
    runner: FullDigitRunner,
    link: "https://adventofcode.com/2021/day/8#part2",
  },
  {
    day: 9,
    title: "Lava Risk",
    file: "lava_tubes",
    runner: LavaRiskRunner,
    link: "https://adventofcode.com/2021/day/9",
  },
  {
    day: 9,
    title: "Lava Basins",
    file: "lava_tubes",
    runner: LavaBasinRunner,
    link: "https://adventofcode.com/2021/day/9#part2",
  },
  {
    day: 10,
    title: "Syntax",
    file: "syntax",
    runner: SyntaxRunner,
    link: "https://adventofcode.com/2021/day/10",
  },
  {
    day: 10,
    title: "Autocomplete",
    file: "syntax",
    runner: AutocompleteRunner,
    link: "https://adventofcode.com/2021/day/10#part2",
  },
  {
    day: 11,
    title: "Count Flash",
    file: "octopi",
    runner: CountFlashRunner,
    link: "https://adventofcode.com/2021/day/11",
    auxInputs: [{ name: "Steps", default: "100" }],
  },
  {
    day: 11,
    title: "Sync Flash",
    file: "octopi",
    runner: SyncFlashRunner,
    link: "https://adventofcode.com/2021/day/11#part2",
    auxInputs: [{ name: "Max Steps", default: "10000" }],
  },
  {
    day: 12,
    title: "Pathing",
    file: "pathing",
    runner: PathRunner,
    link: "https://adventofcode.com/2021/day/12",
    auxInputs: [
      { name: "Small Room Limit", default: "1" },
      { name: "Small Room Buff", default: "0" },
    ],
  },
  {
    day: 13,
    title: "Origami",
    file: "origami",
    runner: Origami,
    link: "https://adventofcode.com/2021/day/13",
    auxInputs: [
      { name: "Size Scale", default: "10" },
      { name: "Dot Scale", default: "10" },
    ],
  },
  {
    day: 14,
    title: "Slow Polymerization",
    file: "polymerization",
    runner: SlowPolymerizer,
    link: "https://adventofcode.com/2021/day/14",
    auxInputs: [
      { name: "Steps", default: "1" },
      { name: "Show Chain", default: "0" },
    ],
  },
  {
    day: 14,
    title: "Fast Polymerization",
    file: "polymerization",
    runner: FastPolymerizer,
    link: "https://adventofcode.com/2021/day/14#part2",
    auxInputs: [{ name: "Steps", default: "1" }],
  },
  {
    day: 15,
    title: "Dijkstra's",
    file: "dijkstra",
    runner: DijkstraRunner,
    link: "https://adventofcode.com/2021/day/15",
    auxInputs: [
      {
        name: "Scale",
        default: "14",
      },
      {
        name: "Font",
        default: "14",
      },
    ],
  },
  {
    day: 15,
    title: "Big Dijkstra's",
    file: "dijkstra",
    runner: BigDijkstraRunner,
    link: "https://adventofcode.com/2021/day/15#part2",
    auxInputs: [
      {
        name: "Scale",
        default: "14",
      },
      {
        name: "Font",
        default: "14",
      },
    ],
  },
];

export const loader = yearLoader(2021, runners);

export default function Default() {
  const { code } = useLoaderData();
  return <CodeFrame code={code} />;
}

export function ErrorBoundary() {
  return <div className="error-container">Something went wrong.</div>;
}
