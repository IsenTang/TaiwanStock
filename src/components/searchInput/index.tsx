"use client";
import { useState, useEffect, Fragment } from "react";
import { useMount } from "react-use";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import SearchIcon from "@mui/icons-material/Search";

// * interfaces
import { Stock } from "@/interfaces/stock.interface";
// * api
import { getInfoByCode } from "@/api";

interface SearchInputProps {
  chooseStock: (stock: Stock) => void;
}

export default function SearchInput(props: SearchInputProps) {
  const { chooseStock } = props;

  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<Stock[]>([]);
  const [inputValue, setInputValue] = useState("");

  // * 获取数据
  useMount(async () => {
    const result = await getInfoByCode({
      data_id: "",
    });
    // * 去重，业务不明，暂时如此
    const map = new Map();
    const array: Stock[] = result.data.filter(
      (item) => !map.has(item.stock_id) && map.set(item.stock_id, 1)
    );
    setOptions(array);
    // * 2330
    const targetStock = array.find((item) => item.stock_id === "2330");
    chooseStock(targetStock);
  });

  return (
    <Autocomplete
      sx={{ width: 400 }}
      size="small"
      open={open}
      onClose={() => {
        setOpen(false);
      }}
      getOptionLabel={(option) => `${option.stock_id} ${option.stock_name}`}
      options={options}
      onFocus={() => {
        setOpen(true);
      }}
      onChange={(e, v) => {
        chooseStock(v);
      }}
      filterOptions={(options, state) => {
        const displayOptions = options.filter((option) =>
          option.stock_id
            .toLowerCase()
            .trim()
            .includes(state.inputValue.toLowerCase().trim())
        );

        return displayOptions;
      }}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            onChange={(e) => {
              const newValue = e.target.value;
              setInputValue(newValue);
            }}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <Fragment>
                  <SearchIcon />
                </Fragment>
              ),
            }}
          />
        );
      }}
    />
  );
}
