import { useEffect, useState, CSSProperties } from "react";
import * as dayjs from "dayjs";
import { useMount, useUnmount } from "react-use";
import _, { set } from "lodash";

// * interfaces
import { Stock } from "@/interfaces/stock.interface";
import { Revenue } from "@/interfaces/revenue.interface";
import { RevenueTableData } from "@/interfaces/table.interface";

// * components
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import * as echarts from "echarts";
import ClipLoader from "react-spinners/ClipLoader";

// * requests
import { getRevenueByCode } from "@/api";
// * props
interface ChartBoxProps {
  stock: Stock;
  setTableData: (data: RevenueTableData[]) => void;
}

export default function ChartBox(props: ChartBoxProps) {
  const { stock, setTableData } = props;
  const [chart, setChart] = useState<echarts.ECharts>(null);
  const [year, setYear] = useState<string>("5");
  const [loading, setLoading] = useState<boolean>(false);

  function refactData(data: Revenue[]) {
    const targetData = data.filter((item) => {
      return (
        !item.date.startsWith(
          dayjs()
            .subtract(Number(year) + 1, "year")
            .year()
        ) &&
        !item.date.startsWith(
          dayjs()
            .subtract(Number(year) + 2, "year")
            .year()
        )
      );
    });
    const xAxis: string[] = [];
    const series: number[] = [];
    const rates: number[] = [];
    const years: number[] = [];
    const tableData: RevenueTableData[] = [];
    targetData.forEach((item) => {
      // * 柱状图
      const year = dayjs(item.date).year();
      if (years.indexOf(year) === -1) {
        years.push(year);
        xAxis.push(year);
      } else {
        xAxis.push("");
      }
      series.push(item.revenue);

      // * 折线图
      // * (单月营收 / 去年同月营收) - 1
      // * 去年同月营收
      const lastYearMounth = dayjs(item.date)
        .subtract(1, "year")
        .format("YYYY-MM-DD");
      const lastYearMouthInfo = data.find(
        (item) => item.date === lastYearMounth
      );
      const rate = item.revenue / lastYearMouthInfo.revenue - 1;
      rates.push((rate * 100).toFixed(2));
      tableData.push({
        date: dayjs(item.date).format("YYYYMM"),
        revenue: item.revenue,
        rate: (rate * 100).toFixed(2),
      });
    });
    setTableData(tableData);
    const option: echarts.EChartOption = {
      legend: {
        data: ["每月营收", "单月营收增长率(%)"],
        icon: "rect",
        left: 100,
        top: 60,
      },
      tooltip: {
        show: true,
      },
      xAxis: {
        data: xAxis,
        axisLabel: {
          interval: 0,
        },
        axisTick: {
          show: false,
        },
      },
      yAxis: [
        {
          type: "value",
          name: "千元",
          position: "left",
          axisLabel: {
            formatter: (value) => {
              return (value / 1000).toLocaleString();
            },
          },
        },
        {
          type: "value",
          name: "%",
          position: "right",
          splitLine: {
            show: false,
          },
          axisLabel: {
            formatter: (value) => {
              return `${value}`;
            },
          },
        },
      ],
      grid: {
        left: 100,
      },
      series: [
        {
          name: "每月营收",
          type: "bar",
          data: series,
          yAxisIndex: 0,
        },
        {
          name: "单月营收增长率(%)",
          type: "line",
          data: rates,
          yAxisIndex: 1,
          tooltip: {
            trigger: "item",
            show: true,
          },
        },
      ],
    };
    chart.setOption(option);
  }

  async function getData() {
    if (stock) {
      setLoading(true);
      const res = await getRevenueByCode({
        data_id: stock.stock_id,
        start_date: dayjs()
          .subtract(Number(year) + 2, "year")
          .format("YYYY-MM-DD"),
        end_date: dayjs().format("YYYY-MM-DD"),
      });
      refactData(res.data);
      setLoading(false);
    }
  }

  useEffect(() => {
    getData();
  }, [stock, year]);

  useMount(() => {
    const instance = echarts.init(document.getElementById("main"), null);
    setChart(instance);
  });

  useUnmount(() => {
    chart && chart.dispose();
  });

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "500px",
        p: "15px",
        position: "relative",
      }}
    >
      {loading && (
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
      )}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          height: "50px",
        }}
      >
        <Button variant="contained">每月营收</Button>
        <Select
          sx={{
            backgroundColor: "#1976d2",
            outline: "none",
            height: "36px",
            width: "88px",
            color: "white",
            border: "none",
            fontWeight: 500,
            fontSize: "0.875rem",
            boxShadow:
              "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
            "& .MuiSelect-icon": {
              color: "white",
            },
          }}
          value={year}
          onChange={(e) => {
            setYear(e.target.value);
          }}
        >
          <MenuItem value={3}>近3年</MenuItem>
          <MenuItem value={5}>近5年</MenuItem>
          <MenuItem value={8}>近8年</MenuItem>
        </Select>
      </Box>
      <Box
        id="main"
        sx={{
          width: "100%",
          height: "350px",
        }}
      ></Box>
    </Card>
  );
}
