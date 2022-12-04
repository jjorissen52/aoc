import React from "react";
import { RunnerOption } from "~/@types/global";
import { Flex } from "~/components/Semantic";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { IO } from "~/components/IO";
import { CodeViewer } from "~/components/CodeViewer";
import Typography from "@mui/material/Typography";
import { SolutionDisplay } from "~/code/code_runner";

type CodeFrameProps = {
  year: number;
  runners: RunnerOption[];
  code: Record<string, string>;
};
export default function CodeFrame({ code, year, runners }: CodeFrameProps) {
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
    <Box mt={3} sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} sx={{ overflow: "hidden" }}>
        <IO
          year={year}
          runners={runners}
          onSelectRunner={setRunner}
          onSelectDay={onSelectDay}
          onOutput={setSolution}
        />
        <CodeViewer code={selectedCode} solution={solution} />
      </Grid>
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
    </Box>
  );
}
