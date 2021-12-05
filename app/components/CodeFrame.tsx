import React from "react";
import { RunnerOption } from "~/@types/global";
import { Flex } from "~/components/Semantic";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { IO } from "~/components/IO";
import { CodeViewer } from "~/components/CodeViewer";
import Typography from "@mui/material/Typography";

type CodeFrameProps = {
  code: Record<string, string>;
};
export default function CodeFrame({ code }: CodeFrameProps) {
  const [runner, setRunner] = React.useState<RunnerOption | null>(null);
  const [day, setDay] = React.useState<number>(1);
  const [link, setLink] = React.useState("");

  const selectedCode = runner && runner.title ? code[runner.title] : "";

  const onSelectDay = (_day: number, _link: string) => {
    setDay(_day);
    setLink(_link);
  };
  return (
    <Box mt={3} sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} sx={{ overflow: "hidden" }}>
        <IO onSelectRunner={setRunner} onSelectDay={onSelectDay} />
        <CodeViewer code={selectedCode} />
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
          <Link href={link}>Day {day}</Link>
        </Typography>
      </Flex>
    </Box>
  );
}
