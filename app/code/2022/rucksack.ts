import { CodeRunner } from "~/code/code_runner";

const priorities = Array.from(
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
).reduce((accum, letter, idx) => {
  accum[letter] = idx + 1;
  return accum;
}, {} as Record<string, number>);

const sumMisplacedPriorities = (rucksacks: string[]): number =>
  rucksacks
    .map((rucksack) => {
      const [one, two] = [
        rucksack.slice(0, rucksack.length / 2),
        rucksack.slice(rucksack.length / 2, rucksack.length),
      ];
      const set = new Set(one);
      return Array.from(
        new Set(Array.from(two).filter((letter) => set.has(letter)))
      )
        .map((l) => priorities[l])
        .reduce((tot, priority) => tot + priority, 0);
    })
    .reduce((tot, priority) => tot + priority, 0);

export const RucksackRunner1 = new CodeRunner(
  (input) => {
    const rucksacks = input.split("\n").filter((v) => !!v);
    return String(sumMisplacedPriorities(rucksacks));
  },
  2022,
  {
    day: 3,
    title: "Rucksack Runner 1",
    file: "rucksack",
  }
);

const sumBadgePriorities = (rucksacks: string[]): number => {
  let group;
  let total = 0;
  while (rucksacks.length) {
    group = rucksacks.slice(0, 3);
    const [one, two, three] = group.map((r) => new Set(r));
    total += Array.from(one)
      .filter((letter) => two.has(letter) && three.has(letter))
      .map((letter) => priorities[letter])
      .reduce((tot, priority) => tot + priority, 0);
    rucksacks = rucksacks.slice(3);
  }
  return total;
};

export const RucksackRunner2 = new CodeRunner(
  (input) => {
    const rucksacks = input.split("\n").filter((v) => !!v);
    return String(sumBadgePriorities(rucksacks));
  },
  2022,
  {
    day: 3,
    title: "Rucksack Runner 2",
    file: "rucksack",
  }
);
