import { CodeRunner } from "~/code/container";

import { bit_collapse, counts, Reduction } from "./power_consumption";

/**
 * Finds the most commonly occurring number in a list of numbers, returning 1 in the event of a tie.
 * @param numbers array of numbers
 * @returns the most common number or 1
 */
const most_common: Reduction = (numbers) => {
  const as_counts = counts(numbers);
  const { current_max, tied } = Object.keys(as_counts).reduce(
    ({ current_max, tied }, number) => {
      // starting condition
      if (current_max === null) {
        current_max = Number(number);
      } else if (as_counts[Number(number)] === as_counts[current_max]) {
        tied.push(Number(number));
      } else {
        if (as_counts[Number(number)] > as_counts[current_max]) {
          current_max = Number(number);
          tied = [];
        }
      }
      return { current_max, tied };
    },
    { current_max: null, tied: [] } as {
      current_max: number | null;
      tied: number[];
    }
  );
  return tied.length ? 1 : (current_max as number);
};

/**
 * Finds the least commonly occurring number in a list of numbers, returning 0 in the event of a tie.
 * @param numbers array of numbers
 * @returns the least common number or 0
 */
const least_common: Reduction = (numbers) => {
  const as_counts = counts(numbers);
  const { current_min, tied } = Object.keys(as_counts).reduce(
    ({ current_min, tied }, number) => {
      // starting condition
      if (current_min === null) {
        current_min = Number(number);
      } else if (as_counts[Number(number)] === as_counts[current_min]) {
        tied.push(Number(number));
      } else {
        if (as_counts[Number(number)] < as_counts[current_min]) {
          current_min = Number(number);
          tied = [];
        }
      }
      return { current_min, tied };
    },
    { current_min: null, tied: [] } as {
      current_min: number | null;
      tied: number[];
    }
  );
  return tied.length ? 0 : (current_min as number);
};

const oxygen = (binaries: string[]): number => {
  let filtered_binaries = [...binaries];
  let bit_position = 0;
  while (filtered_binaries.length > 1 && bit_position < 100) {
    const bit_mask = bit_collapse(filtered_binaries, most_common) || "";
    filtered_binaries = filtered_binaries.filter(
      (b) => b[bit_position] === bit_mask[bit_position]
    );
    bit_position += 1;
  }
  return parseInt(filtered_binaries[0], 2);
};

const co2_scrubber = (binaries: string[]): number => {
  let filtered_binaries = [...binaries];
  let bit_position = 0;
  while (filtered_binaries.length > 1 && bit_position < 100) {
    const bit_mask = bit_collapse(filtered_binaries, least_common) || "";
    filtered_binaries = filtered_binaries.filter(
      (b) => b[bit_position] === bit_mask[bit_position]
    );
    bit_position += 1;
  }
  return parseInt(filtered_binaries[0], 2);
};

const life_support = (input: string[]): number => {
  return oxygen(input) * co2_scrubber(input);
};

export const LifeSupportRunner = new CodeRunner((input: string) => {
  const as_digits = input
    .split(/\s+/)
    .map((word) => word.match(/([0-9]+)/g)?.[0] ?? "")
    .filter((digits) => !isNaN(parseInt(digits, 2)));
  return String(life_support(as_digits));
});
