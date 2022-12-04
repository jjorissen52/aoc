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
  },
  {
    day: 1,
    title: "Sliding Sonar",
    file: "sliding_sonar",
    runner: SlidingSonarRunner,
  },
  {
    day: 2,
    title: "Dive",
    file: "dive",
    runner: DiveRunner,
  },
  {
    day: 2,
    title: "Accurate Dive",
    file: "accurate_dive",
    runner: AccurateDiveRunner,
  },
  {
    day: 3,
    title: "Power Consumption",
    file: "power_consumption",
    runner: PowerConsumptionRunner,
  },
  {
    day: 3,
    title: "Life Support",
    file: "life_support",
    runner: LifeSupportRunner,
  },
  {
    day: 4,
    title: "Bingo",
    file: "bingo",
    runner: BingoRunner,
  },
  {
    day: 4,
    title: "Bad Bingo",
    file: "bingo",
    runner: BadBingoRunner,
  },
  {
    day: 5,
    title: "Hydro Thermal",
    file: "hydrothermal",
    runner: HydroThermal,
  },
  {
    day: 5,
    title: "More Hydro Thermal",
    file: "hydrothermal",
    runner: MoreHydroThermal,
  },
  {
    day: 6,
    title: "Lantern Fish",
    file: "lanternfish",
    runner: SlowLanternFish,
    auxInputs: [{ name: "Days", default: "80" }],
  },
  {
    day: 6,
    title: "Fast Lantern Fish",
    file: "lanternfish",
    runner: FastLanternFish,
    auxInputs: [{ name: "Days", default: "256" }],
  },
  {
    day: 7,
    title: "Crabs",
    file: "crabs",
    runner: CrabRunner,
  },
  {
    day: 7,
    title: "Complex Crabs",
    file: "crabs",
    runner: ComplexCrabRunner,
  },
  {
    day: 8,
    title: "Easy Digits",
    file: "digits",
    runner: SimpleDigitRunner,
  },
  {
    day: 8,
    title: "Full Digits",
    file: "digits",
    runner: FullDigitRunner,
  },
  {
    day: 9,
    title: "Lava Risk",
    file: "lava_tubes",
    runner: LavaRiskRunner,
  },
  {
    day: 9,
    title: "Lava Basins",
    file: "lava_tubes",
    runner: LavaBasinRunner,
  },
  {
    day: 10,
    title: "Syntax",
    file: "syntax",
    runner: SyntaxRunner,
  },
  {
    day: 10,
    title: "Autocomplete",
    file: "syntax",
    runner: AutocompleteRunner,
  },
  {
    day: 11,
    title: "Count Flash",
    file: "octopi",
    runner: CountFlashRunner,
    auxInputs: [{ name: "Steps", default: "100" }],
  },
  {
    day: 11,
    title: "Sync Flash",
    file: "octopi",
    runner: SyncFlashRunner,
    auxInputs: [{ name: "Max Steps", default: "10000" }],
  },
  {
    day: 12,
    title: "Pathing",
    file: "pathing",
    runner: PathRunner,
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
    auxInputs: [{ name: "Steps", default: "1" }],
  },
  {
    day: 15,
    title: "Dijkstra's",
    file: "dijkstra",
    runner: DijkstraRunner,
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
  return <CodeFrame code={code} year={2021} runners={runners} />;
}
