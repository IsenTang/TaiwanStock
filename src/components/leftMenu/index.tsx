import { useState } from "react";
import Stack from "@mui/material/Stack";

import MenuItem from "./MenuItem";

export default function LeftMenuList() {
  const [menuList, setMenuList] = useState([
    {
      letter: "B",
      name: "最新动态",
      color: "#434343",
      active: true,
    },
    {
      letter: "F",
      name: "股票健诊",
      color: "#434343",
      active: false,
    },
    {
      letter: "C",
      name: "财务报表",
      color: "#434343",
      active: false,
    },
    {
      letter: "D",
      name: "获利能力",
      color: "#CC1621",
      active: false,
    },
    {
      letter: "E",
      name: "安全性分析",
      color: "#198420",
      active: false,
    },
    {
      letter: "q",
      name: "成长力分析",
      color: "#E67820",
      active: false,
    },
    {
      letter: "J",
      name: "评估价值",
      color: "#345BA7",
      active: false,
    },
    {
      letter: "G",
      name: "董监与筹码",
      color: "#585858",
      active: false,
    },
    {
      letter: "H",
      name: "关键指标",
      color: "#743079",
      active: false,
    },
    {
      letter: "I",
      name: "产品组合",
      color: "#526FD7",
      active: false,
    },
  ]);

  const selectMenu = (name: string) => {
    const newMenuList = menuList.map((item) => {
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

    setMenuList(newMenuList);
  };

  return (
    <Stack spacing={2} direction="column">
      {menuList.map((item, index) => {
        return (
          <MenuItem
            key={index}
            letter={item.letter}
            name={item.name}
            color={item.color}
            active={item.active}
            selectMenu={selectMenu}
          />
        );
      })}
    </Stack>
  );
}
