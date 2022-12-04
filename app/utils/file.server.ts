import path from "path";
import fs from "fs/promises";

type ReadResult = { filePath: string; contents: string };
export async function read(filename: string) {
  const filePath = path.join(__dirname, "..", "app", "code", filename);
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
  return (await fs.readdir(path.join(__dirname, "..", "app", "code")))
    .map((y) => parseInt(y))
    .filter((y) => !isNaN(y)) as number[];
}
