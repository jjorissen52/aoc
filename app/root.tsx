import React from "react";

import { Scripts, Links, LiveReload, Outlet, useCatch } from "remix";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { GlobalStyles } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function Document({
  children,
  title = `Remix: So great, it's funny!`,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>{title}</title>
      </head>
      <body>
        <Links />
        <Scripts />
        <ThemeProvider theme={darkTheme}>
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
