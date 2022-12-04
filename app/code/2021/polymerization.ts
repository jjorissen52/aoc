import { CodeRunner } from "~/code/code_runner";

const parse_input = (input: string, ...auxInput: string[]) => {
  const [steps, showChain] = auxInput
    .map((v) => parseInt(v))
    .filter((v) => !isNaN(v));
  const [template, pair_insertion] = input.split("\n\n");
  const rules = pair_insertion
    .split("\n")
    .map((line) => line.split(" -> ").slice(0, 2))
    .filter((pair) => pair.length === 2)
    .reduce((rules, pair) => {
      rules[pair[0]] = pair[1];
      return rules;
    }, <Record<string, string>>{});
  return { steps, showChain, template, rules };
};

const extremes = (counts: Record<string, number>) => {
  const [most_common, least_common] = Object.keys(counts).reduce(
    ([most_common, least_common], component) => {
      if (counts[component] > (counts[most_common] ?? -Infinity))
        most_common = component;
      if (counts[component] < (counts[least_common] ?? Infinity))
        least_common = component;
      return [most_common, least_common];
    },
    <[string, string]>["", ""]
  );
  return { most_common, least_common };
};

export const SlowPolymerizer = new CodeRunner(
  (input: string, ...auxInput) => {
    const { steps, showChain, template, rules } = parse_input(
      input,
      ...auxInput
    );

    const chain = Array.from(template);
    for (let i = 0; i < steps ?? 0; i++) {
      const insertions = <Record<number, string>>{};
      for (let idx = 0; idx < chain.length - 1; idx++) {
        const pair = chain.slice(idx, idx + 2).join("");
        if (rules[pair]) insertions[idx + 1] = rules[pair];
      }
      Object.keys(insertions)
        .reverse()
        .forEach((idx) => {
          chain.splice(Number(idx), 0, insertions[Number(idx)]);
        });
    }
    const counts = chain.reduce((counts, component) => {
      counts[component] = (counts[component] ?? 0) + 1;
      return counts;
    }, <Record<string, number>>{});
    const { most_common, least_common } = extremes(counts);
    return (
      `${counts[most_common] - counts[least_common]}:\n\n` +
      `Most  Common: ${most_common} with ${counts[most_common]}\n` +
      `Least Common: ${least_common} with ${counts[least_common]}\n\n` +
      `${!!showChain || false ? chain.join("") : "(not showing chain)"}`
    );
  },
  2021,
  {
    day: 14,
    title: "Slow Polymerization",
    file: "polymerization",
    auxInputs: [
      { name: "Steps", default: "1" },
      { name: "Show Chain", default: "0" },
    ],
  }
);

const combine = (
  a: Record<string, number> | null,
  b: Record<string, number> | null
) => {
  if (!b || !a) return !b ? (!a ? {} : a) : b;
  return Object.keys(a)
    .concat(Object.keys(b))
    .reduce((accum, key) => {
      accum[key] = (a[key] ?? 0) + (b[key] ?? 0);
      return accum;
    }, <Record<string, number>>{});
};

export const FastPolymerizer = new CodeRunner(
  (input, ...auxInput) => {
    const { steps, template, rules } = parse_input(input, ...auxInput);
    const step = (
      pair: string,
      count: number
    ): [Record<string, number>, string] | [null, null] => {
      if (count && pair in rules) {
        const letter = rules[pair];
        return [
          /* Add in counts for the new pairs and subtract counts for the removed pair.
           * Must use combine (or complex `if` logic) because some rules may produce
           * the same pair as the input. e.g., NC => NC, CN */
          combine(
            combine(
              { [`${pair[0]}${letter}`]: count },
              { [`${letter}${pair[1]}`]: count }
            ),
            { [pair]: -count }
          ),
          // middle letter of the produced pair, used for later accounting
          letter,
        ];
      }
      return [null, null];
    };
    const count_letters = (pairCounts: Record<string, number>) =>
      Object.keys(pairCounts).reduce((letterCounts, pair) => {
        if (!pairCounts[pair]) return letterCounts;
        letterCounts[pair[0]] = (letterCounts[pair[0]] ?? 0) + pairCounts[pair];
        letterCounts[pair[1]] = (letterCounts[pair[1]] ?? 0) + pairCounts[pair];
        return letterCounts;
      }, <Record<string, number>>{});

    let pairCounts = <Record<string, number>>{};
    let letterCounts = <Record<string, number>>{};
    for (let i = 0; i < template.length - 1; i++) {
      const pair = template.slice(i, i + 2);
      pairCounts[pair] = (pairCounts[pair] ?? 0) + 1;
      if (i !== template.length - 2) {
        // reduce middle letter count to account for over-counting in pair-notation.
        letterCounts[pair[1]] = (letterCounts[pair[1]] ?? 0) - 1;
      }
    }
    for (let idx = 0; idx < steps; idx++) {
      let stepCounts = {};
      Object.keys(pairCounts).forEach((pair) => {
        const [producedPairs, middleLetter] = step(pair, pairCounts[pair]);
        if (middleLetter)
          /* Because the middle letter is over-represented when stored in pair notation, e.g. NCN => NC, CN => { N:2, C:2 }
           * we want to reduce the count of the middle letter by an amount corresponding to the count of the
           * produced pairs. */
          letterCounts[middleLetter] =
            (letterCounts[middleLetter] ?? 0) - pairCounts[pair];
        stepCounts = combine(stepCounts, producedPairs);
      });
      pairCounts = combine(pairCounts, stepCounts);
    }
    letterCounts = combine(letterCounts, count_letters(pairCounts));
    const { most_common, least_common } = extremes(letterCounts);
    return (
      `${letterCounts[most_common] - letterCounts[least_common]}:\n\n` +
      `Most  Common: ${most_common} with ${letterCounts[most_common]}\n` +
      `Least Common: ${least_common} with ${letterCounts[least_common]}\n\n` +
      `${JSON.stringify(letterCounts)}`
    );
  },
  2021,
  {
    day: 14,
    title: "Fast Polymerization",
    file: "polymerization",
    auxInputs: [{ name: "Steps", default: "1" }],
  }
);
