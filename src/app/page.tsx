"use client";
import { useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
// * interfaces
import { Stock } from "@/interfaces/stock.interface";
// * components
import SearchInput from "@/components/searchInput";
import LeftMenuList from "@/components/leftMenu";
import RightContent from "@/components/rightContent";

export default function Home() {
  const [targetStock, setTargetStock] = useState<Stock>();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
        width: "100%",
        bgcolor: "#EDEDED",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "60px",
          width: "100%",
          bgcolor: "white",
          py: "5px",
        }}
      >
        <SearchInput chooseStock={setTargetStock} />
      </Box>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "calc(100vh - 60px)",
            boxSizing: "border-box",
            p: 3,
          }}
        >
          <LeftMenuList></LeftMenuList>
          <RightContent stock={targetStock}></RightContent>
        </Box>
      </Container>
    </Box>
  );
}
