import React from "react";
import { Flex } from "~/components/Semantic";
import Link from "@mui/material/Link";
import { IO, RunnerOption } from "~/components/IO";
import { CodeViewer } from "~/components/CodeViewer";
import Typography from "@mui/material/Typography";
import { SolutionDisplay } from "~/code/code_runner";

import { styled } from "@mui/material/styles";
import { NoSsr } from "@mui/material";

export type CodeFrameProps = {
  year: number;
  code: Record<string, string>;
  className?: string;
};
export default styled(function ({ code, year, className }: CodeFrameProps) {
  const [runner, setRunner] = React.useState<RunnerOption | null>(null);
  const [solution, setSolution] = React.useState<SolutionDisplay | undefined>(
    undefined
  );
  const [day, setDay] = React.useState<number>(1);

  const selectedCode = runner && runner.title ? code[runner.title] : "";

  const onSelectDay = (_day: number) => {
    setDay(_day);
  };
  return (
    <div className={className}>
      <div className="panels">
        <NoSsr>
          <IO
            className="io"
            year={year}
            onSelectRunner={setRunner}
            onSelectDay={onSelectDay}
            onOutput={setSolution}
          />
        </NoSsr>
        <CodeViewer
          className="viewer"
          code={selectedCode}
          solution={solution}
        />
      </div>
      <Flex
        sx={{
          position: "absolute",
          bottom: 0,
          width: "98%",
          overflow: "hidden",
          marginBottom: 3,
          justifyContent: "center",
        }}
      >
        <Typography variant={"h5"}>
          <Link href={`https://adventofcode.com/${year}/day/${day}`}>
            Day {day}
          </Link>
        </Typography>
      </Flex>
    </div>
  );
})(() => ({
  ".panels": {
    display: "flex",
    flexDirection: "row",
    ".io": {
      flex: "1 1 50rem",
      minWidth: "30rem",
    },
    ".viewer": {
      flex: "1 1 100rem",
    },
  },
  ".okay": {
    color: "blue",
  },
}));
