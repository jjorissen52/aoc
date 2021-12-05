import { CodeRunner } from "~/code/container";

// https://adventofcode.com/2021/day/1
export const sonar = (readings: number[]): number =>
  readings
    .slice(1)
    .reduce((accum, value, idx) => accum + (value > readings[idx] ? 1 : 0), 0);

export const SonarRunner = new CodeRunner((input: string) => {
  const as_numbers = input
    .split(/\s/)
    .map((word) => parseFloat(word))
    .filter((v) => !isNaN(v));
  return String(sonar(as_numbers));
});
