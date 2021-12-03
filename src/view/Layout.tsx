import React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid, { GridProps } from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import { CodeRunner } from "../code/container";
import { SonarRunner } from "../code/sonar";
import { SlidingSonarRunner } from "../code/sliding_sonar";

import raw from "raw.macro";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  margin: theme.spacing(3),
  color: theme.palette.text.secondary,
}));

export const Column: React.FunctionComponent<GridProps> = ({
  xs = 6,
  sx,
  children,
  ...props
}) => (
  <Grid item xs={xs} {...props}>
    <Item sx={{ height: "900px", overflow: "auto", ...sx }}>{children}</Item>
  </Grid>
);

type RunnerOption = {
  title: string;
  content: string;
  runner: CodeRunner;
};

const runners: RunnerOption[] = [
  { title: "Sonar", runner: SonarRunner, content: raw("../code/sonar.ts") },
  {
    title: "Sliding Sonar",
    runner: SlidingSonarRunner,
    content: raw("../code/sliding_sonar.ts"),
  },
];

export type IOProps = {
  onSelectRunner?: (value: string | null) => void;
};
export const IO: React.FunctionComponent<IOProps> = ({ onSelectRunner }) => {
  const [input, setInput] = React.useState<string>("");
  const [output, setOuput] = React.useState<string>("No runner selected.");
  const [selectedRunner, setSelectedRunner] = React.useState<string | null>(
    null
  );

  const computeOutput = async (_input: string) => {
    setOuput("Computing...");
    const _output =
      runners.find((r) => r.title === selectedRunner)?.runner.run(_input) ??
      "No output to display.";
    setOuput(_output);
  };

  const _onSelectRunner = (runner: string | null) => {
    setSelectedRunner(runner);
    onSelectRunner && onSelectRunner(runner);
  };

  const _onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  React.useEffect(() => {
    computeOutput(input);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input, selectedRunner]);

  return (
    <Column>
      <Box
        width={1}
        mt={2}
        mb={2}
        pl={1}
        pr={1}
        sx={{ boxSizing: "border-box" }}
      >
        <Autocomplete
          clearOnEscape
          renderInput={(params) => (
            <TextField {...params} label="Select a Runner" variant="standard" />
          )}
          getOptionLabel={(option: RunnerOption) => option.title}
          options={runners}
          onChange={(event, newValue) => {
            _onSelectRunner(newValue && newValue.title);
          }}
        />
      </Box>
      <Box sx={{ display: "flex", flexFlow: "row" }}>
        <Box width={1 / 2} sx={{ height: "100%", margin: "8px 8px 8px 8px" }}>
          <TextField
            sx={{ width: "100%" }}
            minRows={25}
            maxRows={25}
            label="Input"
            placeholder="Input"
            multiline
            variant={"filled"}
            value={input}
            onChange={_onChangeInput}
          />
        </Box>
        <Box width={1 / 2} sx={{ height: "100%", margin: "8px 8px 8px 8px" }}>
          <TextField
            sx={{ width: "100%" }}
            minRows={25}
            label="Output"
            placeholder="Output"
            multiline
            variant={"filled"}
            value={output}
            InputProps={{
              readOnly: true,
            }}
          />
        </Box>
      </Box>
    </Column>
  );
};

export const CodeViewer: React.FunctionComponent<{ runner: string | null }> = ({
  runner,
}) => {
  const code =
    (runner && runners.find((r) => r.title === runner)?.content) ||
    "// No runner found.";
  return (
    <Column>
      <SyntaxHighlighter language="typescript" style={materialDark}>
        {code}
      </SyntaxHighlighter>
    </Column>
  );
};
