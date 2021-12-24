import { CodeRunner } from "~/code/code_runner";

export const counts = (numbers: number[]): Record<number, number> =>
  numbers.reduce(
    (accum, num) => {
      accum[num] += 1;
      return accum;
    },
    numbers.reduce((accum, num) => {
      accum[num] = 0;
      return accum;
    }, {} as Record<number, number>)
  );

export type Reduction = (numbers: number[]) => number;
const most_common: Reduction = (numbers) => {
  const as_counts = counts(numbers);
  return Object.keys(as_counts).reduce((current_max, number) => {
    current_max =
      as_counts[Number(number)] > as_counts[current_max]
        ? Number(number)
        : current_max;
    return current_max;
  }, numbers[0]);
};

const least_common: Reduction = (numbers) => {
  const as_counts = counts(numbers);
  return Object.keys(as_counts).reduce((current_min, number) => {
    current_min =
      as_counts[Number(number)] < as_counts[current_min]
        ? Number(number)
        : current_min;
    return current_min;
  }, numbers[0]);
};

/**
 * Perform a column-wise operation on a list of binary numbers of the same size. Assumes
 * Sanitized inputs.
 *
 * @param binaries array of binary numbers (string)
 * @param column_op column-wise operation to perfom on each individual bit
 * @returns
 */
export const bit_collapse = (
  binaries: string[],
  column_op: Reduction
): string | null => {
  if (binaries.length === 0) return null;
  return Array.from(binaries[0])
    .reduce((accum, digit, idx) => {
      accum[idx] = String(column_op(binaries.map((b) => Number(b[idx]))));
      return accum;
    }, Array(binaries[0]).fill(""))
    .join("");
};

/**
 * Generates new binary number from the most common bit of each column of bits of a
 * list of binary numbers.
 * @param binaries array of binary numbers (string)
 * @returns decimal number corresponding to the resulting binary
 */
const gamma = (binaries: string[]): number => {
  const res = parseInt(bit_collapse(binaries, most_common) ?? "", 2);
  return !isNaN(res) ? res : 0;
};

/**
 * Generates new binary number from the lest common bit of each column of bits of a
 * list of binary numbers.
 * @param binaries array of binary numbers (string)
 * @returns decimal number corresponding to the resulting binary
 */
const epsilon = (binaries: string[]): number => {
  const res = parseInt(bit_collapse(binaries, least_common) ?? "", 2);
  return !isNaN(res) ? res : 0;
};

const power_consumption = (input: string[]): number => {
  return epsilon(input) * gamma(input);
};

export const PowerConsumptionRunner = new CodeRunner((input: string) => {
  const as_digits = input
    .split(/\s+/)
    .map((word) => word.match(/([0-9]+)/g)?.[0] ?? "")
    .filter((digits) => !isNaN(parseInt(digits, 2)));

  return String(power_consumption(as_digits));
});
