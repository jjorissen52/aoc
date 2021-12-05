import { readAll } from "~/utils/file.server";
import { RunnerOption } from "~/@types/global";

export const yearLoader =
  (year: string | number, runners: RunnerOption[]) => async () => {
    const readResults = await readAll(
      ...runners.map((r) => `/${year}/${r.file}.ts`)
    );
    const code = readResults.reduce((accum, { contents }, idx) => {
      accum[runners[idx].title] = contents;
      return accum;
    }, {} as Record<string, string>);
    return { code };
  };
