import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useLoaderData } from "@remix-run/react";
import { LoaderProps, yearLoader } from "~/utils/loaders";
import CodeFrame from "~/components/CodeFrame";
import { IconButton } from "@mui/material";
import { useState } from "react";

import StartIcon from "@mui/icons-material/Start";

export default function Default() {
  const { years, year, code } = useLoaderData() as LoaderProps;
  const [day, setDay] = useState(0);

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6" noWrap component="div">
            Advent of Code | {year}
          </Typography>
          <div>
            <IconButton
              size="small"
              component={"a"}
              href={`https://adventofcode.com/${year}/day/${day}`}
            >
              <img
                src="/aoc_star.png"
                style={{ width: "25px" }}
                alt={"Advent of Code Star"}
              />
            </IconButton>
            <IconButton
              size="small"
              component={"a"}
              href={`https://adventofcode.com/${year}/day/${day + 1}`}
              disabled={day + 1 === 26}
            >
              <StartIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", mt: 6 }}
      >
        <CodeFrame code={code} year={year} onSelectDay={setDay} />
      </Box>
      <Drawer
        sx={{
          width: 70,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 70,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="right"
      >
        <Toolbar />
        <Divider />
        <List disablePadding>
          {years.map((_year) => (
            <ListItem key={_year} disablePadding>
              <ListItemButton
                component="a"
                href={`/years/${_year}/`}
                selected={String(year) === _year}
              >
                <ListItemText primary={_year} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
    </Box>
  );
}

export const loader = yearLoader();
