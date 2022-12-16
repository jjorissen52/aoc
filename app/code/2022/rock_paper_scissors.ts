import { CodeRunner } from "~/code/code_runner";

type Choices = "rock" | "paper" | "scissors";

const OUTCOME_POINT_MAP: Record<Choices, Record<Choices, number>> = {
  rock: {
    rock: 3,
    paper: 6,
    scissors: 0,
  },
  paper: {
    rock: 0,
    paper: 3,
    scissors: 6,
  },
  scissors: {
    rock: 6,
    paper: 0,
    scissors: 3,
  },
};

const CHOICE_POINT_MAP: Record<Choices, number> = {
  rock: 1,
  paper: 2,
  scissors: 3,
};

const mistakenOutcome = (plays: [string, string][]) => {
  const OPTION_MAP: Record<string, Choices> = {
    A: "rock",
    B: "paper",
    C: "scissors",
    X: "rock",
    Y: "paper",
    Z: "scissors",
  };
  return plays
    .map(([opponent, me]) => [OPTION_MAP[opponent], OPTION_MAP[me]])
    .map(([opp, me]) => CHOICE_POINT_MAP[me] + OUTCOME_POINT_MAP[opp][me])
    .reduce((tot, score) => tot + score, 0);
};

export const RockPaperScissorsRunner = new CodeRunner(
  (input) => {
    const plays = input
      .split("\n")
      .map((line) => line.split(" "))
      .map(([opp, me]) => [opp, me] as [string, string])
      .filter(([opp, me]) => opp && me);
    return String(mistakenOutcome(plays));
  },
  2022,
  {
    day: 2,
    title: "Simple Rock Paper Scissors",
    file: "rock_paper_scissors",
  }
);

const correctOutcome = (plays: [string, string][]) => {
  const OPPONENT_CHOICES: Record<string, Choices> = {
    A: "rock",
    B: "paper",
    C: "scissors",
  };
  const RESPONSE_MAP: Record<string, Record<string, Choices>> = {
    // rock
    A: {
      // lose
      X: "scissors",
      // tie
      Y: "rock",
      // win
      Z: "paper",
    },
    // paper
    B: {
      // lose
      X: "rock",
      // tie
      Y: "paper",
      // win
      Z: "scissors",
    },
    // scissors
    C: {
      // lose
      X: "paper",
      // tie
      Y: "scissors",
      // win
      Z: "rock",
    },
  };
  return plays
    .map(([opponent, me]) => [
      OPPONENT_CHOICES[opponent],
      RESPONSE_MAP[opponent][me],
    ])
    .map(([opp, me]) => CHOICE_POINT_MAP[me] + OUTCOME_POINT_MAP[opp][me])
    .reduce((tot, score) => tot + score, 0);
};

export const RockPaperScissorsRunner2 = new CodeRunner(
  (input) => {
    const plays = input
      .split("\n")
      .map((line) => line.split(" "))
      .map(([opp, me]) => [opp, me] as [string, string])
      .filter(([opp, me]) => opp && me);
    return String(correctOutcome(plays));
  },
  2022,
  {
    day: 2,
    title: "Correct Rock Paper Scissors",
    file: "rock_paper_scissors",
  }
);
