import * as React from "react";
import Box from "@mui/material/Box";
import "./leftItem.css";

interface LeftItemProps {
  name: string;
  active: boolean;
  selectMenu: (name: string) => void;
}

export default function LeftItem(props: LeftItemProps) {
  const { name, active, selectMenu } = props;
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "150px",
        height: "30px",
        cursor: "pointer",
        position: "relative",
      }}
      onClick={() => selectMenu(name)}
    >
      {active && <div className="leftItemBorder"></div>}
      <div
        style={{
          color: active ? "#0386f4" : "black",
        }}
      >
        {name}
      </div>
    </Box>
  );
}
