import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import GlobalStyles from "@mui/material/GlobalStyles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";

import { CodeViewer, IO, Heading } from "./view/Layout";
import { RunnerOption } from "./code";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const App: React.FunctionComponent = () => {
  const [runner, setRunner] = React.useState<RunnerOption | null>(null);
  const [day, setDay] = React.useState<number>(1);
  const [link, setLink] = React.useState("");

  const onSelectDay = (_day: number, _link: string) => {
    setDay(_day);
    setLink(_link);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <GlobalStyles
        styles={{
          body: {
            backgroundColor: darkTheme.palette.background.default,
            color: darkTheme.palette.text.secondary,
          },
          pre: {
            boxSizing: "border-box",
            height: "98%",
            margin: "8px 8px 8px 8px",
          },
        }}
      />
      <Box mt={3} sx={{ flexGrow: 1 }}>
        <Heading
          sx={{
            display: "flex",
            justifyContent: "space-around",
            height: "100px",
          }}
        >
          Advent of Code 2021 - <Link href={link}>Day {day}</Link>
        </Heading>
        <Grid container spacing={2} sx={{ overflow: "hidden" }}>
          <IO onSelectRunner={setRunner} onSelectDay={onSelectDay} />
          <CodeViewer runner={runner} />
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default App;
