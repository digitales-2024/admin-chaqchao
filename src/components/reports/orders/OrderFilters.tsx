import { OrderStatus, OrderReportData } from "@/types/orders";
import React from "react";

import { OrderFiltersForm } from "./OrderFiltersForm";
import { OrderReportTable } from "./OrderReportTable";

interface OrderFiltersProps {
  orderDateRange: { from: string; to: string | undefined };
  setOrderDateRange: (value: { from: string; to: string | undefined }) => void;
  orderStatus: OrderStatus;
  setOrderStatus: (value: OrderStatus) => void;
  totalAmount: string;
  setTotalAmount: (value: string) => void;
  isActive: boolean;
  setIsOrderActive: (value: boolean) => void;
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
  totalAmount,
  setTotalAmount,
  isActive,
  setIsOrderActive,
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
        totalAmount={totalAmount}
        setTotalAmount={setTotalAmount}
        isActive={isActive}
        setIsOrderActive={setIsOrderActive}
        isLoading={isLoading}
        downloadReportPdf={downloadReportPdf}
        downloadReportExcel={downloadReportExcel}
      />
      <OrderReportTable reportData={reportData} />
    </>
  );
}
