import { CodeRunner } from "~/code/code_runner";

type CostFunction = (center: number, numbers: number[]) => number;
const simple_cost: CostFunction = (center, numbers) =>
  numbers.reduce((sum, n) => {
    const _cost = Math.abs(n - center);
    return sum + _cost;
  }, 0);

const complex_cost: CostFunction = (center, numbers) =>
  numbers.reduce((sum, n) => {
    const distance = Math.abs(n - center);
    return sum + (distance * (distance + 1)) / 2;
  }, 0);

const minimum_cost = (numbers: number[], cost: CostFunction): number => {
  const sorted = [...numbers].sort((a, b) => (a < b ? -1 : 1));
  let min = cost(sorted[0], numbers);
  if (sorted.length === 1) return min;
  for (let center = sorted[1]; center <= sorted[sorted.length - 1]; center++) {
    const next_cost = cost(center, numbers);
    if (next_cost < min) {
      min = next_cost;
    }
  }
  return min;
};

export const CrabRunner = new CodeRunner(
  (input: string) => {
    const as_numbers = input
      .split(",")
      .map((n) => parseInt(n))
      .filter((n) => !isNaN(n));
    return String(minimum_cost(as_numbers, simple_cost));
  },
  2021,
  {
    day: 7,
    title: "Crabs",
    file: "crabs",
  }
);

export const ComplexCrabRunner = new CodeRunner(
  (input: string) => {
    const as_numbers = input
      .split(",")
      .map((n) => parseInt(n))
      .filter((n) => !isNaN(n));
    return String(minimum_cost(as_numbers, complex_cost));
  },
  2021,
  {
    day: 7,
    title: "Complex Crabs",
    file: "crabs",
  }
);
