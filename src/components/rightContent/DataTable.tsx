import { useRef, useLayoutEffect, useState } from "react";
// * interfaces
import { RevenueTableData } from "@/interfaces/table.interface";

// * components
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import ClipLoader from "react-spinners/ClipLoader";

import "./DataTable.css";

interface DataTableProps {
  tableData: RevenueTableData[];
}

export default function DataTable(props: DataTableProps) {
  const { tableData } = props;
  const tableRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useLayoutEffect(() => {
    if (tableRef.current) {
      setLoading(true);
      setTimeout(() => {
        tableRef.current.scrollLeft = tableRef.current.scrollWidth;
        setLoading(false);
      }, 500);
    }
  }, [tableData]);
  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        height: "300px",
        width: "100%",
        p: "15px",
        position: "relative",
      }}
    >
      <Box
        sx={{
          display: "flex",
          position: "absolute",
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 100,
        }}
      >
        <ClipLoader
          color="#36d7b7"
          loading={loading}
          size={50}
          data-testid="loader"
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          height: "50px",
        }}
      >
        <Button variant="contained">详细数据</Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          marginTop: "15px",
        }}
      >
        <div className="dataTable-left">
          <div className="table-cell">年度月份</div>
          <div className="table-cell">每月营收</div>
          <div className="table-cell">单月营收年增率(%)</div>
        </div>
        <div className="dataTable-right" ref={tableRef}>
          {tableData.map((item) => (
            <div className="table-right-cell" key={item.date}>
              <div className="table-cell">{item.date}</div>
              <div className="table-cell">{item.revenue.toLocaleString()}</div>
              <div className="table-cell">{item.rate}</div>
            </div>
          ))}
        </div>
      </Box>
    </Card>
  );
}
