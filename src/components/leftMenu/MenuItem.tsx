import * as React from "react";
import Box from "@mui/material/Box";

interface MenuItemProps {
  letter: string;
  name: string;
  color: string;
  active: boolean;
  selectMenu: (name: string) => void;
}

export default function MenuItem(props: MenuItemProps) {
  const { letter, name, color, active, selectMenu } = props;
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "150px",
        height: "50px",
        borderLeft: active ? "3px solid #0386F4" : "3px solid transparent",
        cursor: "pointer",
      }}
      onClick={() => selectMenu(name)}
    >
      <div style={{ color }}>{letter}</div>
      <div
        style={{
          color: active ? "#0386F4" : "black",
        }}
      >
        {name}
      </div>
    </Box>
  );
}
