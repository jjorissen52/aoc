import React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box, { BoxProps } from "@mui/material/Box";
import Grid, { GridProps } from "@mui/material/Grid";

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
    <Item sx={{ height: "90vh", overflow: "auto", ...sx }}>{children}</Item>
  </Grid>
);

export const Flex = styled(Box)(() => ({
  display: "flex",
}));
