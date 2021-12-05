/* eslint-disable */

/**
 * Run me with node --require esbuild-register ./src/cli.ts
 */
import chalk from "chalk";
// @ts-ignore
import { program } from "commander";
import { textSync } from "figlet";
import fs from "fs";

import { runners } from "~/routes/years/2021";

program
  .version("0.0.0")
  .addHelpText(
    "before",
    `${chalk.red(textSync("advent-of-code", { horizontalLayout: "full" }))}\n\n`
  )
  .description("CLI for running advent of code");

program
  .command("run <runner>")
  .description("use a runner")
  .option("--file <file>")
  .action((runner, { file }) => {
    const _runner = runners.find((r) => r.title === runner);
    if (!_runner) {
      console.error(chalk.yellowBright(`No such runner ${chalk.cyan(runner)}`));
      return;
    }
    console.log(_runner.runner.run(fs.readFileSync(file, "utf-8")));
  });

program.parse(process.argv);
