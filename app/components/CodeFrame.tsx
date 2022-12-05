import React, { useEffect } from "react";
import { Column } from "~/components/Semantic";
import { IO, RunnerOption } from "~/components/IO";
import { CodeViewer } from "~/components/CodeViewer";
import { SolutionDisplay } from "~/code/code_runner";

import { styled } from "@mui/material/styles";
import { NoSsr } from "@mui/material";

export type CodeFrameProps = {
  year: number;
  code: Record<string, string>;
  className?: string;
  onSelectDay?: (day: number) => void;
};
export default styled(function ({
  code,
  year,
  onSelectDay = console.debug,
  className,
}: CodeFrameProps) {
  const [runner, setRunner] = React.useState<RunnerOption | null>(null);
  const [solution, setSolution] = React.useState<SolutionDisplay | undefined>(
    undefined
  );
  const [day, setDay] = React.useState<number>(1);
  useEffect(() => {
    onSelectDay(day);
  }, []);

  const selectedCode = runner && runner.title ? code[runner.title] : "";
  return (
    <div className={className}>
      <div className="panels">
        <NoSsr fallback={<Column className="io" />}>
          <IO
            className="io"
            year={year}
            onSelectRunner={setRunner}
            onSelectDay={(day) => {
              setDay(day);
              onSelectDay(day);
            }}
            onOutput={setSolution}
          />
        </NoSsr>
        <NoSsr fallback={<Column className="viewer" />}>
          <CodeViewer
            className="viewer"
            code={selectedCode}
            solution={solution}
            year={year}
            day={day}
          />
        </NoSsr>
      </div>
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
      maxWidth: "100rem",
      flex: "1 1 100rem",
    },
  },
  ".okay": {
    color: "blue",
  },
}));
