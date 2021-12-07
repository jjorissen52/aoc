import { CodeRunner } from "~/code/container";

const underflow =
  (ceiling = 10) =>
  (value: number): number => {
    return value < 0 ? ceiling : value;
  };

const slow_simulation = (days = 0) => {
  const flow6 = underflow(6);
  return (fish: number[]) => {
    let fish_clock = [...fish];
    let new_fish = [] as number[];
    for (let day = 0; day <= days; day++) {
      fish_clock = fish_clock.concat(new_fish);
      new_fish = [];
      for (let i = 0; i < fish_clock.length; i++) {
        if (fish_clock[i] === 0) new_fish.push(8);
        fish_clock[i] = flow6(fish_clock[i] - 1);
      }
    }
    return fish_clock.length;
  };
};

const fast_simulation = (days = 0) => {
  const flow6 = underflow(6);
  return (_fish: number[]) => {
    const fish = [..._fish];
    const day_count = { 0: fish.length } as Record<number, number>;
    // seed each day with its starter number of new fish
    for (let day = 0; day < days; day++) {
      for (let i = 0; i < fish.length; i++) {
        if (fish[i] === 0) {
          if (!day_count[day + 1]) day_count[day + 1] = 1;
          else day_count[day + 1] += 1;
        }
        fish[i] = flow6(fish[i] - 1);
      }
    }
    // iterate over each day, seeding days with newborn fish
    for (let day = 1; day <= days; day++) {
      if (!day_count[day]) continue;
      // shared internal counter for fish born on this day
      let shared_internal = 8;
      // allow newborns to multiply
      for (let iday = day; iday < days; iday++) {
        if (shared_internal === 0) {
          if (!day_count[iday + 1]) day_count[iday + 1] = day_count[day];
          else day_count[iday + 1] += day_count[day];
        }
        shared_internal = flow6(shared_internal - 1);
      }
    }
    return Object.values(day_count).reduce((sum, n) => sum + n);
  };
};

export const SlowLanternFish = new CodeRunner((input: string, ...auxInput) => {
  const [daysInput] = auxInput;
  const _days = parseInt(daysInput);
  const days = isNaN(_days) || _days > 80 ? 80 : _days;
  const as_numbers = input
    .split(",")
    .map((n) => parseInt(n))
    .filter((v) => !isNaN(v));
  return String(slow_simulation(days)(as_numbers));
});

export const FastLanternFish = new CodeRunner((input: string, ...auxInput) => {
  const [daysInput] = auxInput;
  const days = isNaN(parseInt(daysInput)) ? 256 : parseInt(daysInput);
  const as_numbers = input
    .split(",")
    .map((n) => parseInt(n))
    .filter((v) => !isNaN(v));
  return String(fast_simulation(days)(as_numbers));
});
