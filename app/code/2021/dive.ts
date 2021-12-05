import { CodeRunner } from "~/code/container";

const directions = ["up", "down", "forward"] as const;
const directionSet = new Set(directions);
type Vector = {
  magnitude: number;
  direction: typeof directions[number];
};

export class Submarine {
  // Consider up/down to be from the perspective of the 4th quadrant
  x: number;
  y: number;

  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  forward(n: number): Submarine {
    this.x += n;
    return this;
  }

  up(n: number): Submarine {
    this.y -= n;
    return this;
  }

  down(n: number): Submarine {
    this.y += n;
    return this;
  }

  dive(vectors: Vector[]): number {
    const position = vectors.reduce((position, vector) => {
      return position[vector.direction](vector.magnitude);
    }, this as Submarine);
    return position.x * position.y;
  }
}

function isDirection(value?: string): boolean {
  return directionSet.has(value as Vector["direction"]);
}

export const input_to_vectors = (input: string): Vector[] =>
  input
    .split(/\n/)
    .map((word) => {
      const direction = word.match(/(up|down|forward)/g)?.[0];
      const magnitude = parseFloat(word.match(/([0-9]+)/g)?.[0] ?? "");
      return { direction, magnitude };
    })
    .filter((maybe_vector) => {
      const { direction, magnitude } = maybe_vector;
      return isDirection(direction) && !isNaN(magnitude);
    }) as Vector[];

export const DiveRunner = new CodeRunner((input: string) => {
  const as_vectors = input_to_vectors(input);
  return String(new Submarine().dive(as_vectors));
});
