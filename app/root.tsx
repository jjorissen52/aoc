import React from "react";

import { Links, LiveReload, Outlet, Scripts, useCatch } from "@remix-run/react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { GlobalStyles } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function Document({
  children,
  title = `Advent of Code`,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <Links />
        <Scripts />
      </head>
      <body>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <GlobalStyles
            styles={{
              body: {
                backgroundColor: darkTheme.palette.background.default,
                color: darkTheme.palette.text.secondary,
              },
            }}
          />
          {process.env.NODE_ENV === "development" ? <LiveReload /> : null}
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  return (
    <Document title={`${caught.status} ${caught.statusText}`}>
      <div className="error-container">
        <h1>
          {caught.status} {caught.statusText}
        </h1>
      </div>
    </Document>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <Document title="Uh-oh!">
      <div className="error-container">
        <h1>App Error</h1>
        <pre>{error.message}</pre>
      </div>
    </Document>
  );
}
