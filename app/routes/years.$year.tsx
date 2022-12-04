import * as React from "react";
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
import { yearLoader } from "~/utils/loaders";
import CodeFrame from "~/components/CodeFrame";

export default function PermanentDrawerRight() {
  const { year, code } = useLoaderData();

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Advent of Code | {year}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", mt: 6 }}
      >
        <CodeFrame code={code} year={year} />
      </Box>
      <Drawer
        sx={{
          width: 100,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 100,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="right"
      >
        <Toolbar />
        <Divider />
        <List>
          {[2021, 2022].map((text) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["All mail", "Trash", "Spam"].map((text) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}

export const loader = yearLoader();
