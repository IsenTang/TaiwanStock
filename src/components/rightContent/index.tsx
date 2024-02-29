import { useEffect, useState } from "react";
// * interfaces
import { Stock } from "@/interfaces/stock.interface";
import { RevenueTableData } from "@/interfaces/table.interface";

// * components
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import LeftItem from "./LeftItem";
import ChartBox from "./ChartBox";
import DataTable from "./DataTable";

// * props
interface RightContentProps {
  stock: Stock;
}

export default function RightContent(props: RightContentProps) {
  const { stock } = props;
  const [menu, setMenu] = useState([
    {
      name: "每月营收",
      active: true,
    },
    {
      name: "每月盈余",
      active: false,
    },
    {
      name: "每月净值",
      active: false,
    },
    {
      name: "损益表",
      active: false,
    },
    {
      name: "总资产",
      active: false,
    },
    {
      name: "负债和股东权益",
      active: false,
    },
    {
      name: "现金流量表",
      active: false,
    },
    {
      name: "股利政策",
      active: false,
    },
    {
      name: "电子书",
      active: false,
    },
  ]);
  const [tableData, setTableData] = useState<RevenueTableData[]>([]);

  const selectMenu = (name: string) => {
    const newMenu = menu.map((item) => {
      if (item.name === name) {
        return {
          ...item,
          active: true,
        };
      } else {
        return {
          ...item,
          active: false,
        };
      }
    });

    setMenu(newMenu);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        gap: "50px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "15px",
          height: "100%",
          borderLeft: "3px solid #E4E4E4",
        }}
      >
        {menu.map((item) => (
          <LeftItem
            name={item.name}
            active={item.active}
            selectMenu={selectMenu}
            key={item.name}
          ></LeftItem>
        ))}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          gap: "15px",
        }}
      >
        <Card
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            height: "50px",
            px: "20px",
          }}
        >
          {stock && stock.stock_name}&ensp;
          {stock && `(${stock.stock_id})`}
        </Card>
        <ChartBox stock={stock} setTableData={setTableData}></ChartBox>
        <DataTable tableData={tableData}></DataTable>
      </Box>
    </Box>
  );
}
