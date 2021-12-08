import React from "react";
import { LoaderFunction, useLoaderData } from "remix";
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
];

export const loader: LoaderFunction = yearLoader(2021, runners);

export default function Default() {
  const { code } = useLoaderData();
  return <CodeFrame code={code} />;
}

export function ErrorBoundary() {
  return <div className="error-container">Something went wrong.</div>;
}
