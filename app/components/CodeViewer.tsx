import React from "react";
import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import CodeIcon from "@mui/icons-material/Code";
import HtmlIcon from "@mui/icons-material/Html";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { Column, Flex } from "~/components/Semantic";
import { SolutionDisplay } from "~/code/code_runner";
import { useLocalStorage } from "~/utils/hooks";
import { AOCFrame } from "~/components/AOCFrame";

export const CodeViewer: React.FunctionComponent<{
  code?: string;
  solution?: SolutionDisplay;
  className?: string;
  year: number;
  day: number;
}> = ({ code, solution, year, day, className }) => {
  const [displayMode, setDisplayMode] = useLocalStorage<
    "code" | "html" | "string" | "aoc"
  >("display-mode", "string");
  const solutionWithNewlines = () =>
    String(solution ?? "...").replace(/\n/g, "<br>");

  const htmlOutput =
    displayMode === "html"
      ? solution?.toHTML
        ? solution.toHTML()
        : solutionWithNewlines()
      : displayMode === "string"
      ? solutionWithNewlines()
      : "";

  return (
    <Column
      className={className}
      sx={{ fontFamily: "monospace", position: "relative", overflow: "hidden" }}
    >
      <Flex justifyContent={"right"}>
        <ToggleButtonGroup
          size="small"
          exclusive
          value={displayMode ?? undefined}
          onChange={(ev, mode) => setDisplayMode(mode)}
          sx={(theme) => ({
            position: "absolute",
            zIndex: 1000,
            bottom: theme.spacing(1),
            right: theme.spacing(1),
            backgroundColor: "background.default",
          })}
        >
          <ToggleButton value={"string"} aria-label={"string"}>
            <TextSnippetIcon />
          </ToggleButton>
          <ToggleButton value={"html"} aria-label={"html"}>
            <HtmlIcon />
          </ToggleButton>
          <ToggleButton value={"code"} aria-label={"code"}>
            <CodeIcon />
          </ToggleButton>
          <ToggleButton value={"aoc"} aria-label={"aoc"}>
            <img
              src="/aoc_star.png"
              style={{ width: "25px" }}
              alt={"Advent of Code Star"}
            />
          </ToggleButton>
        </ToggleButtonGroup>
      </Flex>
      <div style={{ width: "100%", height: "100%", overflow: "auto" }}>
        {["code", "html"].includes(displayMode) && (
          <Box dangerouslySetInnerHTML={{ __html: htmlOutput }} />
        )}
        {displayMode === "code" && (
          <SyntaxHighlighter language="typescript" style={materialDark}>
            {code ? code : "// No runner found."}
          </SyntaxHighlighter>
        )}
        {displayMode === "aoc" && <AOCFrame url={`/${year}/day/${day}`} />}
      </div>
    </Column>
  );
};

const materialDark = {
  'code[class*="language-"]': {
    textAlign: "left",
    whiteSpace: "pre",
    wordSpacing: "normal",
    wordBreak: "normal",
    wordWrap: "normal",
    color: "#eee",
    background: "#2f2f2f",
    fontFamily: "Roboto Mono, monospace",
    fontSize: "1em",
    lineHeight: "1.5em",
    MozTabSize: "4",
    OTabSize: "4",
    tabSize: "4",
    WebkitHyphens: "none",
    MozHyphens: "none",
    msHyphens: "none",
    hyphens: "none",
  },
  'pre[class*="language-"]': {
    textAlign: "left",
    whiteSpace: "pre",
    wordSpacing: "normal",
    wordBreak: "normal",
    wordWrap: "normal",
    color: "#eee",
    background: "#2f2f2f",
    fontFamily: "Roboto Mono, monospace",
    fontSize: "1em",
    lineHeight: "1.5em",
    MozTabSize: "4",
    OTabSize: "4",
    tabSize: "4",
    WebkitHyphens: "none",
    MozHyphens: "none",
    msHyphens: "none",
    hyphens: "none",
    overflow: "auto",
    position: "relative",
    margin: "0.5em 0",
    padding: "1.25em 1em",
  },
  'code[class*="language-"]::-moz-selection': {
    background: "#363636",
  },
  'pre[class*="language-"]::-moz-selection': {
    background: "#363636",
  },
  'code[class*="language-"] ::-moz-selection': {
    background: "#363636",
  },
  'pre[class*="language-"] ::-moz-selection': {
    background: "#363636",
  },
  'code[class*="language-"]::selection': {
    background: "#363636",
  },
  'pre[class*="language-"]::selection': {
    background: "#363636",
  },
  'code[class*="language-"] ::selection': {
    background: "#363636",
  },
  'pre[class*="language-"] ::selection': {
    background: "#363636",
  },
  ':not(pre) > code[class*="language-"]': {
    whiteSpace: "normal",
    borderRadius: "0.2em",
    padding: "0.1em",
  },
  ".language-css > code": {
    color: "#fd9170",
  },
  ".language-sass > code": {
    color: "#fd9170",
  },
  ".language-scss > code": {
    color: "#fd9170",
  },
  '[class*="language-"] .namespace': {
    Opacity: "0.7",
  },
  atrule: {
    color: "#c792ea",
  },
  "attr-name": {
    color: "#ffcb6b",
  },
  "attr-value": {
    color: "#a5e844",
  },
  attribute: {
    color: "#a5e844",
  },
  boolean: {
    color: "#c792ea",
  },
  builtin: {
    color: "#ffcb6b",
  },
  cdata: {
    color: "#80cbc4",
  },
  char: {
    color: "#80cbc4",
  },
  class: {
    color: "#ffcb6b",
  },
  "class-name": {
    color: "#f2ff00",
  },
  comment: {
    color: "#616161",
  },
  constant: {
    color: "#c792ea",
  },
  deleted: {
    color: "#ff6666",
  },
  doctype: {
    color: "#616161",
  },
  entity: {
    color: "#ff6666",
  },
  function: {
    color: "#c792ea",
  },
  hexcode: {
    color: "#f2ff00",
  },
  id: {
    color: "#c792ea",
    fontWeight: "bold",
  },
  important: {
    color: "#c792ea",
    fontWeight: "bold",
  },
  inserted: {
    color: "#80cbc4",
  },
  keyword: {
    color: "#c792ea",
  },
  number: {
    color: "#fd9170",
  },
  operator: {
    color: "#89ddff",
  },
  prolog: {
    color: "#616161",
  },
  property: {
    color: "#80cbc4",
  },
  "pseudo-class": {
    color: "#a5e844",
  },
  "pseudo-element": {
    color: "#a5e844",
  },
  punctuation: {
    color: "#89ddff",
  },
  regex: {
    color: "#f2ff00",
  },
  selector: {
    color: "#ff6666",
  },
  string: {
    color: "#a5e844",
  },
  symbol: {
    color: "#c792ea",
  },
  tag: {
    color: "#ff6666",
  },
  unit: {
    color: "#fd9170",
  },
  url: {
    color: "#ff6666",
  },
  variable: {
    color: "#ff6666",
  },
};
