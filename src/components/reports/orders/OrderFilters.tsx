import { OrderStatus, OrderReportData } from "@/types/orders";
import React from "react";

import { OrderFiltersForm } from "./OrderFiltersForm";
import { OrderReportTable } from "./OrderReportTable";

interface OrderFiltersProps {
  orderDateRange: { from: string; to: string | undefined };
  setOrderDateRange: (value: { from: string; to: string | undefined }) => void;
  orderStatus: OrderStatus;
  setOrderStatus: (value: OrderStatus) => void;
  priceMin: string;
  setPriceMin: (value: string) => void;
  priceMax: string;
  setPriceMax: (value: string) => void;
  isLoading: boolean;
  downloadReportPdf: () => void;
  downloadReportExcel: () => void;
  reportData: OrderReportData[];
}

export function OrderFilters({
  orderDateRange,
  setOrderDateRange,
  orderStatus,
  setOrderStatus,
  priceMin,
  setPriceMin,
  priceMax,
  setPriceMax,
  isLoading,
  downloadReportPdf,
  downloadReportExcel,
  reportData = [],
}: OrderFiltersProps) {
  return (
    <>
      <OrderFiltersForm
        orderDateRange={orderDateRange}
        setOrderDateRange={setOrderDateRange}
        orderStatus={orderStatus}
        setOrderStatus={setOrderStatus}
        priceMin={priceMin}
        setPriceMin={setPriceMin}
        priceMax={priceMax}
        setPriceMax={setPriceMax}
        isLoading={isLoading}
        downloadReportPdf={downloadReportPdf}
        downloadReportExcel={downloadReportExcel}
      />
      <OrderReportTable reportData={reportData} />
    </>
  );
}
