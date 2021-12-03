import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import GlobalStyles from "@mui/material/GlobalStyles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import { CodeViewer, IO } from "./view/Layout";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const App: React.FunctionComponent = () => {
  const [runner, setRunner] = React.useState<string | null>(null);

  return (
    <ThemeProvider theme={darkTheme}>
      <GlobalStyles
        styles={{
          body: {
            backgroundColor: darkTheme.palette.background.default,
          },
          pre: {
            boxSizing: "border-box",
            height: "98%",
            margin: "8px 8px 8px 8px",
          },
        }}
      />
      <Box mt={3} sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} sx={{ overflow: "hidden" }}>
          <IO onSelectRunner={setRunner} />
          <CodeViewer runner={runner} />
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default App;
