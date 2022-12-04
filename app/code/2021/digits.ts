import { CodeRunner } from "~/code/code_runner";
import { partition } from "~/code/2021/util";

const intersection =
  (overlap: number) =>
  (a: string, b: string): boolean => {
    return (
      Array.from(a).filter((v) => Array.from(b).includes(v)).length === overlap
    );
  };

const same_as = (code: string) => {
  const digit = new Set(Array.from(code));
  return (other: string): boolean => {
    return (
      other.length === code.length &&
      Array.from(other).filter((v) => digit.has(v)).length === code.length
    );
  };
};

const map_digits = (input: string[]): Record<number, string> => {
  const map = input.reduce((accum, code) => {
    switch (code.length) {
      case 2:
        accum[1] = code;
        break;
      case 3:
        accum[7] = code;
        break;
      case 4:
        accum[4] = code;
        break;
      case 7:
        accum[8] = code;
    }
    return accum;
  }, {} as Record<number, string>);
  const sixes = input.filter((code) => code.length === 6);
  // whichever code of length 6 has intersection(1) with "1" is "6"
  const [[six], _sixes] = partition(sixes, (code) =>
    intersection(1)(map[1], code)
  );
  // whichever code of length 6 has intersection(4) with "4" is "9", the other is "0"
  const [[nine], [zero]] = partition(_sixes, (code) =>
    intersection(4)(map[4], code)
  );
  if ([six, nine, zero].some((v) => v === undefined)) throw new Error("uh oh");
  map[6] = six;
  map[9] = nine;
  map[0] = zero;

  const fives = input.filter((code) => code.length === 5);
  // whichever code of length 5 has intersection(2) with "1" is "3"
  const [[three], __fives] = partition(fives, (code) =>
    intersection(2)(map[1], code)
  );
  // whichever code of length 5 has intersection(5) with "6" is "5", and the last one is "2"
  const [[five], [two]] = partition(__fives, (code) =>
    intersection(5)(map[6], code)
  );
  map[3] = three;
  map[5] = five;
  map[2] = two;
  return map;
};

const clean = (input: string) =>
  input
    .split("\n")
    .filter((line) => !!line)
    .reduce(
      (accum, line) => {
        const [code, output] = line.split(" | ");
        accum.codes.push(code);
        accum.outputs.push(output);
        return accum;
      },
      { codes: [] as string[], outputs: [] as string[] }
    );

export const SimpleDigitRunner = new CodeRunner(
  (input) => {
    const { codes, outputs } = clean(input);
    let count = 0;
    for (let idx = 0; idx < codes.length; idx++) {
      const _ = map_digits(codes[idx].split(" "));
      outputs[idx].split(" ").forEach((output) => {
        if (same_as(_[1])(output)) count += 1;
        if (same_as(_[4])(output)) count += 1;
        if (same_as(_[7])(output)) count += 1;
        if (same_as(_[8])(output)) count += 1;
      });
    }
    return String(count);
  },
  2021,
  {
    day: 8,
    title: "Easy Digits",
    file: "digits",
  }
);

export const FullDigitRunner = new CodeRunner(
  (input) => {
    const { codes, outputs } = clean(input);
    let sum = 0;
    for (let idx = 0; idx < codes.length; idx++) {
      let num = "";
      const _ = map_digits(codes[idx].split(" "));
      outputs[idx].split(" ").forEach((output) => {
        if (same_as(_[0])(output)) num += "0";
        if (same_as(_[1])(output)) num += "1";
        if (same_as(_[2])(output)) num += "2";
        if (same_as(_[3])(output)) num += "3";
        if (same_as(_[4])(output)) num += "4";
        if (same_as(_[5])(output)) num += "5";
        if (same_as(_[6])(output)) num += "6";
        if (same_as(_[7])(output)) num += "7";
        if (same_as(_[8])(output)) num += "8";
        if (same_as(_[9])(output)) num += "9";
      });
      sum += Number(num);
    }
    return String(sum);
  },
  2021,
  {
    day: 8,
    title: "Full Digits",
    file: "digits",
  }
);
