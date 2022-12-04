import { CodeRunner } from "~/code/code_runner";
import { atoi, invert, max, take } from "~/utils/misc";

const sum = <T extends number>(items: T[]) =>
  items.reduce((total, item) => total + item, 0);

const max_calories = (calorie_counts: number[][]): number =>
  max(calorie_counts.map(sum));

const top_3_calories = (calorie_counts: number[][]): number =>
  sum(take(calorie_counts.map(sum), 3));

export const MaxCalorieRunner = new CodeRunner(
  (input) => {
    const given_calories: number[][] = input
      .split("\n\n")
      .map((line) => line.split("\n").map(atoi).filter(invert(isNaN)));

    return String(max_calories(given_calories));
  },
  2022,
  {
    day: 1,
    title: "Max Calorie Counting",
    file: "calorie_counting",
  }
);

export const Top3CalorieRunner = new CodeRunner(
  (input) => {
    const given_calories: number[][] = input
      .split("\n\n")
      .map((line) => line.split("\n").map(atoi).filter(invert(isNaN)));

    return String(top_3_calories(given_calories));
  },
  2022,
  {
    day: 1,
    title: "Top 3 Calorie Counting",
    file: "calorie_counting",
  }
);
