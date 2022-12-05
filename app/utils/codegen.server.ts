import { listCodeFiles } from "~/utils/file.server";
import { template } from "lodash";
import { readFileSync, writeFileSync } from "fs";

const TEMPLATE = `\
/* THIS FILE IS AUTO-GENERATED, do not modify its contents.
 * These below exports and window attachment are necessary for the
 * code runners to be "registered" and available. */
<% _.forEach(years, function(year) { %><% print(year) %><% }); %>`;

const YEAR_TEMPLATE = `
// CODE YEAR <%= year %>
<% _.forEach(exports, function(_export) { %><% print(_export) %><% }); %>`;

const EXPORT_TEMPLATE = `export * as <%= file %> from "./<%= year %>/<%= file %>";\n`;

export function generateCodeRunnerExports(location: string): boolean {
  const codeFiles = listCodeFiles();

  const full = template(TEMPLATE);
  const _export = template(EXPORT_TEMPLATE);
  const year = template(YEAR_TEMPLATE);

  const currentContents = readFileSync(location, "utf8");
  const newContents = full({
    years: Object.keys(codeFiles).map((y) =>
      year({
        year: y,
        exports: codeFiles[y].map((file) =>
          _export({ year: y, file: file.replace(/\.[tj]sx?$/, "") })
        ),
      })
    ),
  });
  if (currentContents !== newContents) {
    writeFileSync(location, newContents, "utf8");
    return true;
  }
  return false;
}
