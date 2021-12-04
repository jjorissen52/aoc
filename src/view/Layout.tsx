import React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box, { BoxProps } from "@mui/material/Box";
import Grid, { GridProps } from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Slider from "@mui/material/Slider";

import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";

import { runners, RunnerOption } from "../code";
import { useLocalStorage } from "./hooks";

export const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  margin: theme.spacing(3),
  color: theme.palette.text.secondary,
}));

export const Heading: React.FunctionComponent<BoxProps> = ({
  children,
  ...props
}) => {
  return (
    <Box {...props}>
      <Typography variant={"h3"}>{children}</Typography>
    </Box>
  );
};

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

export type IOProps = {
  onSelectRunner?: (value: RunnerOption | null) => void;
  onSelectDay?: (day: number, link: string) => void;
};
export const IO: React.FunctionComponent<IOProps> = ({
  onSelectRunner,
  onSelectDay,
}) => {
  type State = {
    input: string;
    output: string;
    day: number;
    selectedRunner: string | null;
    filteredRunners: string[];
  };

  const [storedState, setStoredState] = useLocalStorage("aoc", {
    input: "",
    output: "No runner selected.",
    day: 1,
    selectedRunner: null,
    filteredRunners: runners.filter((r) => r.day === 1).map((r) => r.title),
  } as State);

  const [state, setState] = React.useReducer(
    (oldState: State, newState: Partial<State>) => ({
      ...oldState,
      ...newState,
    }),
    storedState
  );

  const { input, output, day, selectedRunner, filteredRunners } = state;

  const computeOutput = async (input: string) => {
    setState({ output: "Computing..." });
    setState({
      output:
        runners.find((r) => r.title === selectedRunner)?.runner.run(input) ??
        "No output to display.",
    });
  };

  const _onSelectDay = (e: React.ChangeEvent<HTMLInputElement>) => {
    const day = e.target.value ? Number(e.target.value) : 1;
    const filteredRunners = runners
      .filter((r) => r.day === day)
      .map((r) => r.title);
    setState({
      day,
      selectedRunner: filteredRunners?.[0] ?? null,
      filteredRunners,
    });
  };

  const _onSelectRunner = (runner: RunnerOption | null) => {
    setState({ selectedRunner: runner && runner.title });
  };

  const _onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ input: e.target.value });
  };

  React.useEffect(() => {
    computeOutput(input);
    const runner = runners.find((r) => r.title === selectedRunner);
    onSelectRunner && onSelectRunner(runner ?? null);
    onSelectDay && onSelectDay(day, runner?.link ?? "");
    setStoredState({ input, output, day, selectedRunner, filteredRunners });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input, selectedRunner, day]);

  return (
    <Column>
      <Box
        width={1}
        mt={2}
        mb={2}
        pl={2}
        pr={2}
        sx={{ boxSizing: "border-box", overflow: "hidden" }}
      >
        <Typography id="input-slider" gutterBottom>
          Select a Day
        </Typography>
        <Slider
          aria-label="Restricted values"
          value={day}
          onChange={(e) =>
            _onSelectDay(e as unknown as React.ChangeEvent<HTMLInputElement>)
          }
          step={null}
          max={Math.max(...runners.map((r) => r.day))}
          valueLabelDisplay="auto"
          marks={Array(Math.max(...runners.map((r) => r.day)))
            .fill(1)
            .map((num, idx) => ({ value: num + idx, label: num + idx }))}
        />
      </Box>
      <Box
        width={1}
        mt={2}
        mb={2}
        pl={1}
        pr={1}
        sx={{ boxSizing: "border-box" }}
      >
        <FormControl fullWidth>
          <InputLabel id="select-runner">Runner</InputLabel>
          <Select
            labelId="select-runner"
            value={selectedRunner}
            label="Select a Runner"
            onChange={(e) =>
              setState({ selectedRunner: e.target.value ?? null })
            }
          >
            {filteredRunners.map((r) => (
              <MenuItem key={r} value={r}>
                {r}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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

export const CodeViewer: React.FunctionComponent<{
  runner: RunnerOption | null;
}> = ({ runner }) => {
  const code = (runner && runner.content) || "// No runner found.";
  return (
    <Column>
      <SyntaxHighlighter language="typescript" style={materialDark}>
        {code}
      </SyntaxHighlighter>
    </Column>
  );
};
