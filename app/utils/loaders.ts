import { readAll } from "~/utils/file.server";
import { RUNNER_MAP } from "~/code/code_runner";
import { LoaderArgs } from "@remix-run/node";
import { CodeFrameProps } from "~/components/CodeFrame";
import { atoi } from "~/utils/misc";

export type LoaderProps = Omit<CodeFrameProps, "runners"> & { years: string[] };
export const yearLoader =
  () =>
  async ({ request }: LoaderArgs): Promise<LoaderProps> => {
    const year = atoi(request.url.match(/(\d{4})\/?$/)?.[1] ?? "2021");
    const readResults = await readAll(
      ...(RUNNER_MAP[year].map((r) => `/${year}/${r.file}.ts`) ?? [])
    );
    const code = readResults.reduce((accum, { contents }, idx) => {
      accum[RUNNER_MAP[year][idx].title] = contents;
      return accum;
    }, {} as Record<string, string>);
    return { year, code, years: Object.keys(RUNNER_MAP) };
  };
