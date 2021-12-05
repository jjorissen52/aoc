import { CodeRunner } from "~/code/container";

declare type JSONValue =
  | null
  | string
  | number
  | boolean
  | { [x: string]: JSONValue }
  | Array<JSONValue>;

declare type RunnerOption = {
  day: number;
  title: string;
  file: string;
  link: string;
  runner: CodeRunner;
};
