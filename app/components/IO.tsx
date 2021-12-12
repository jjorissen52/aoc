import React from "react";
import { runners } from "~/routes/years/2021";
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
import { NoSsr } from "@mui/material";
import { RunnerOption } from "~/@types/global";

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
    auxInput: string[];
    output: string;
    day: number;
    selectedRunner: string | null;
    filteredRunners: string[];
  };

  const [storedState, setStoredState] = useLocalStorage("aoc", {
    input: "",
    auxInput: [],
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
  const runnerObject = runners.find((r) => r.title === selectedRunner);
  const auxInput =
    state.auxInput ?? Array(runnerObject?.auxInputs?.length ?? 0).fill("");

  const computeOutput = async (input: string, auxInputs: string[]) => {
    setState({ output: "Computing..." });
    setState({
      output:
        runnerObject?.runner.run(input, ...(auxInputs ?? [])) ??
        "No output to display.",
    });
  };

  React.useEffect(() => {
    computeOutput(input, auxInput);
    const runner = runners.find((r) => r.title === selectedRunner);
    onSelectRunner && onSelectRunner(runner ?? null);
    onSelectDay && onSelectDay(day, runner?.link ?? "");
    setStoredState({
      input,
      auxInput,
      output,
      day,
      selectedRunner,
      filteredRunners,
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
      filteredRunners,
    });
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
    <Column sx={{ display: "flex", flexDirection: "column" }}>
      <NoSsr>
        <Box sx={{ minHeight: "300px" }}>
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
                _onSelectDay(
                  e as unknown as React.ChangeEvent<HTMLInputElement>
                )
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
              mt={2}
              mb={2}
              pl={1}
              pr={1}
              sx={{
                boxSizing: "border-box",
                flexBasis: "max-content",
              }}
            >
              {runnerObject.auxInputs.map((aux, idx) => (
                <Box key={aux.name} width={1} sx={{ height: "100%" }}>
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
              InputProps={{
                style: {
                  fontFamily: "Roboto Mono, monospace",
                },
              }}
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
                style: {
                  fontFamily: "Roboto Mono, monospace",
                },
              }}
            />
          </Box>
        </Box>
      </NoSsr>
    </Column>
  );
};
