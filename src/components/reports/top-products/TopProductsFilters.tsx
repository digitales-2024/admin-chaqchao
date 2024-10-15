import { TopProduct } from "@/types";

import { TopProductsFiltersForm } from "./TopProductsFiltersForm";
import { TopProductsReport } from "./TopProductsReport";

interface TopProductsFiltersProps {
  productDateRange: { from: string; to: string | undefined };
  setProductDateRange: (value: {
    from: string;
    to: string | undefined;
  }) => void;
  isLoading: boolean;
  downloadReportPdf: () => void;
  downloadReportExcel: () => void;
  reportData: TopProduct[];
  topValue: string;
  setTopValue: (value: string) => void;
}

export function TopProductsFilters({
  productDateRange,
  setProductDateRange,
  isLoading,
  downloadReportPdf,
  downloadReportExcel,
  reportData = [],
  topValue,
  setTopValue,
}: TopProductsFiltersProps) {
  // Filtrar los productos según el valor de topValue
  const filteredReportData =
    topValue === "all" ? reportData : reportData.slice(0, parseInt(topValue));

  return (
    <>
      <TopProductsFiltersForm
        productDateRange={productDateRange}
        setProductDateRange={setProductDateRange}
        topValue={topValue}
        setTopValue={setTopValue}
        downloadReportPdf={downloadReportPdf}
        downloadReportExcel={downloadReportExcel}
        isLoading={isLoading}
      />
      <TopProductsReport reportData={filteredReportData} />
    </>
  );
}
