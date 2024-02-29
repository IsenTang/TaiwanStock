import api from "@/common/request.ts";
import { Stock } from "@/interfaces/stock.interface";
import { CustomResponse } from "@/interfaces/response.interface";
import { Revenue } from "@/interfaces/revenue.interface";

export async function getInfoByCode(params): Promise<CustomResponse<Stock[]>> {
  return await api.get("/data", {
    params: {
      ...params,
      dataset: "TaiwanStockInfo",
    },
  });
}

export async function getRevenueByCode(
  params
): Promise<CustomResponse<Revenue[]>> {
  return await api.get("/data", {
    params: {
      ...params,
      dataset: "TaiwanStockMonthRevenue",
    },
  });
}
