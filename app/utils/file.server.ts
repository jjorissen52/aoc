import path from "path";
import fs from "fs/promises";
import { readdirSync } from "fs";

export const appPath = (...args: string[]) =>
  path.join(__dirname, "..", "app", ...args);

type ReadResult = { filePath: string; contents: string };
export async function read(filename: string) {
  const filePath = appPath("code", filename);
  const contents = await fs.readFile(filePath, "utf8");
  return { filePath, contents } as ReadResult;
}

export async function readAll(...files: string[]) {
  return Promise.all(
    // @ts-ignore
    files.map(async (filePath) => read(filePath))
  );
}

export async function getYears() {
  return (await fs.readdir(appPath("code")))
    .map((y) => parseInt(y))
    .filter((y) => !isNaN(y)) as number[];
}

export function listCodeFiles(): Record<string, string[]> {
  return readdirSync(appPath("code"))
    .filter((d) => d.match(/\d{4}/))
    .reduce((accum, year) => {
      accum[year] = readdirSync(appPath("code", year));
      return accum;
    }, {} as Record<string, string[]>);
}
