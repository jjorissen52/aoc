import { CodeRunner } from "./container";

import { sonar } from "./sonar";

// https://adventofcode.com/2021/day/1#part2
export const SlidingSonarRunner = new CodeRunner((input: string) => {
  const as_numbers = input
    .split(/\s+/)
    .map((word) => parseFloat(word.match(/([0-9]+)/g)?.[0] ?? ""))
    .filter((v) => !isNaN(v));

  const as_sliding_readings = as_numbers
    .slice(2)
    .map((value, idx) => value + as_numbers[idx + 1] + as_numbers[idx]);

  console.log(as_sliding_readings);
  return String(sonar(as_sliding_readings));
});