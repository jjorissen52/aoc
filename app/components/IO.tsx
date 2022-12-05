import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { Column } from "~/components/Semantic";
import { useLocalStorage } from "~/utils/hooks";
import {
  CodeRunner,
  RUNNER_MAP,
  SolutionDisplay,
  SolutionOutput,
} from "~/code/code_runner";

import * as initCode from "~/code/init";
import { attachToWindow } from "~/utils/window";

attachToWindow({
  initCode,
});

export type RunnerOption = {
  day: number;
  title: string;
  file: string;
  runner: CodeRunner;
  auxInputs?: { name: string; default: string }[];
};

export type IOProps = {
  year: number;
  onSelectRunner?: (value: RunnerOption | null) => void;
  onSelectDay?: (day: number) => void;
  onOutput?: (solution: SolutionDisplay) => void;
  className?: string;
};

const _ = (str: string) => new SolutionOutput(str);

export const IO: React.FunctionComponent<IOProps> = ({
  year,
  onSelectRunner,
  onSelectDay,
  onOutput,
  className,
}) => {
  type State = {
    input: string;
    auxInput: string[];
    day: number;
    selectedRunner: string | null;
  };

  const [storedState, setStoredState] = useLocalStorage(`aoc-${year}`, {
    input: "",
    auxInput: [],
    day: 1,
    selectedRunner: null,
  } as State);

  const runners = RUNNER_MAP[year];
  const [filteredRunners, setFilteredRunners] = useState(() =>
    runners.filter((r) => r.day === storedState.day).map((r) => r.title)
  );

  const [output, setOutput] = React.useState<SolutionDisplay>(_("..."));
  const [state, setState] = React.useReducer(
    (oldState: State, newState: Partial<State>) => ({
      ...oldState,
      ...newState,
    }),
    storedState
  );
  const { input, day, selectedRunner } = state;

  const runnerObject = runners.find((r) => r.title === selectedRunner);
  const auxInput =
    state.auxInput ?? Array(runnerObject?.auxInputs?.length ?? 0).fill("");

  const computeOutput = async (input: string, auxInputs: string[]) => {
    const solution =
      runnerObject?.runner.run(input, ...(auxInputs ?? [])) ??
      _("No output to display.");
    setOutput(solution);
    onOutput && onOutput(solution);
  };

  React.useEffect(() => {
    computeOutput(input, auxInput);
    const runner = runners.find((r) => r.title === selectedRunner);
    onSelectRunner && onSelectRunner(runner ?? null);
    onSelectDay && onSelectDay(day);
    setStoredState({
      input,
      auxInput,
      day,
      selectedRunner,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input, auxInput, selectedRunner, day]);

  const _onSelectDay = (e: React.ChangeEvent<HTMLInputElement>) => {
    const day = e.target.value ? Number(e.target.value) : 1;
    const filteredRunners = runners
      .filter((r) => r.day === day)
      .map((r) => r.title);
    setState({
      day,
      selectedRunner: filteredRunners?.[0] ?? null,
    });
    setFilteredRunners(filteredRunners);
  };

  const _onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ input: e.target.value });
  };

  const _onChangeAuxInput = (idx: number) => {
    const newAuxInput = [...auxInput];
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      newAuxInput[idx] = e.target.value;
      setState({ auxInput: newAuxInput });
    };
  };

  return (
    <Column
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
      className={className}
    >
      <Box>
        <TextField
          sx={{ width: "100%" }}
          label="Input"
          placeholder="Input"
          variant={"filled"}
          multiline
          minRows={4}
          maxRows={4}
          value={input}
          onChange={_onChangeInput}
          InputProps={{
            style: {
              fontFamily: "Roboto Mono, monospace",
            },
          }}
        />
        <TextField
          sx={{ width: "100%" }}
          minRows={25}
          label="Output"
          placeholder="Output"
          multiline
          variant={"filled"}
          value={String(output)}
          InputProps={{
            readOnly: true,
            style: {
              fontFamily: "Roboto Mono, monospace",
            },
          }}
        />
      </Box>
      <Box>
        <Box
          width={1}
          mt={2}
          mb={2}
          pl={1}
          pr={1}
          sx={{
            boxSizing: "border-box",
            flexBasis: "max-content",
          }}
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
        {runnerObject?.auxInputs?.length && (
          <Box
            width={1}
            my={2}
            px={1}
            sx={{
              boxSizing: "border-box",
              flexBasis: "max-content",
            }}
          >
            {runnerObject.auxInputs.map((aux, idx) => (
              <Box key={aux.name} width={1} my={2} sx={{ height: "100%" }}>
                <TextField
                  sx={{ width: "100%" }}
                  label={aux.name}
                  placeholder={aux.default}
                  value={auxInput[idx] ?? aux.default}
                  onChange={_onChangeAuxInput(idx)}
                  InputProps={{
                    style: {
                      fontFamily: "Roboto Mono, monospace",
                    },
                  }}
                />
              </Box>
            ))}
          </Box>
        )}
        <Box
          width={1}
          mt={2}
          mb={2}
          pl={2}
          pr={2}
          sx={{
            boxSizing: "border-box",
            overflow: "hidden",
            flexBasis: "100px",
          }}
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
            min={1}
            max={Math.max(...runners.map((r) => r.day))}
            valueLabelDisplay="auto"
            marks={Array(Math.max(...runners.map((r) => r.day)))
              .fill(1)
              .map((num, idx) => ({ value: num + idx, label: num + idx }))}
          />
        </Box>
      </Box>
    </Column>
  );
};
