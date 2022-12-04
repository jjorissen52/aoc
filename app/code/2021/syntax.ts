import { CodeRunner } from "~/code/code_runner";
// map of grouping depth to the indexes of control characters occurring at that depth
type ChunkMap = Record<number, number[]>;

const openers = ["{", "[", "(", "<"] as const;
const is_opener = (char: string) => opener_set.has(char);
const opener_set = new Set<string>(openers);
const partners = {
  "{": "}",
  "[": "]",
  "(": ")",
  "<": ">",
} as Record<string, string>;

const get_chunks = (line: string): ChunkMap => {
  const ctrl = line.match(/[{}()<>\[\]]/g) ?? [];
  const chunks = {} as ChunkMap;
  let depth = 0;
  for (let idx = 0; idx < ctrl.length; idx++) {
    if (is_opener(ctrl[idx])) {
      depth += 1;
      if (chunks[depth]) chunks[depth].push(idx);
      else chunks[depth] = [idx];
    } else {
      if (chunks[depth]) chunks[depth].push(idx);
      else chunks[depth] = [idx];
      depth -= 1;
    }
  }
  return chunks;
};

// we expect an even number of control characters at any depth
const incomplete = (ctrl_indexes: number[]) => ctrl_indexes.length % 2 !== 0;
const corrupt = (line: string) => {
  const is_pair = (i: number, j: number) => {
    const [open, close] = [line[i], line[j]];
    return partners[open] === close;
  };
  return (ctrl_indexes: number[]) => {
    for (let idx = 0; idx < ctrl_indexes.length; idx += 2) {
      if (!ctrl_indexes[idx] || !ctrl_indexes[idx + 1]) return "";
      if (!is_pair(ctrl_indexes[idx], ctrl_indexes[idx + 1]))
        return line[ctrl_indexes[idx + 1]];
    }
    return "";
  };
};

export const SyntaxRunner = new CodeRunner(
  (input: string) => {
    const lines = input.split("\n").filter((line) => !!line);
    const syntax_errors = lines
      .map((line) => {
        const chunked_line = get_chunks(line);
        const get_corrupt = corrupt(line);
        for (const depth in chunked_line) {
          const error = get_corrupt(chunked_line[depth]);
          if (error) return error;
        }
        return "";
      })
      .filter((error) => !!error);
    const points = {
      ")": 3,
      "]": 57,
      "}": 1197,
      ">": 25137,
    } as Record<string, number>;
    return String(
      syntax_errors.reduce((score, error) => score + points[error], 0)
    );
  },
  2021,
  {
    day: 10,
    title: "Syntax",
    file: "syntax",
  }
);

export const AutocompleteRunner = new CodeRunner(
  (input: string) => {
    const lines = input.split("\n").filter((line) => !!line);
    const autocompleted = lines
      .map((line) => [line, get_chunks(line)] as [string, ChunkMap])
      .filter(([line, chunked_line]) => {
        const get_corrupt = corrupt(line);
        for (const depth of Object.keys(chunked_line)) {
          if (get_corrupt(chunked_line[Number(depth)])) {
            return false;
          }
        }
        return true;
      })
      .map(([line, chunked_line]) => {
        let additions = "";
        Object.keys(chunked_line)
          .reverse()
          .forEach((depth) => {
            const ctrl_indexes = chunked_line[Number(depth)];
            if (incomplete(ctrl_indexes)) {
              additions +=
                partners[line[ctrl_indexes[ctrl_indexes.length - 1]]];
            }
          });
        return additions;
      });
    const points = {
      ")": 1,
      "]": 2,
      "}": 3,
      ">": 4,
    } as Record<string, number>;
    const scores = autocompleted
      .map((additions) => {
        return Array.from(additions).reduce(
          (score, char) => score * 5 + points[char],
          0
        );
      })
      .sort((a, b) => (a < b ? -1 : 1));
    return String(scores[Math.floor(scores.length / 2)]);
  },
  2021,
  {
    day: 10,
    title: "Autocomplete",
    file: "syntax",
  }
);
