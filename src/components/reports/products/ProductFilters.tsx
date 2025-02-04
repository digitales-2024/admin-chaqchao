import { ProductData, Category } from "@/types";
import React from "react";

import { ProductFiltersForm } from "./ProductFiltersForm";
import { ProductReportTable } from "./ProductReportTable";

interface ProductFiltersProps {
  productDateRange: { from: string; to: string | undefined };
  setProductDateRange: (value: {
    from: string;
    to: string | undefined;
  }) => void;
  priceMin: string;
  setPriceMin: (value: string) => void;
  priceMax: string;
  setPriceMax: (value: string) => void;
  categoryName: string;
  setCategoryName: (value: string) => void;
  isLoading: boolean;
  downloadReportPdf: () => void;
  downloadReportExcel: () => void;
  reportData: ProductData[];
  categoriesData: Category[];
  isLoadingCategories: boolean;
}

export function ProductFilters({
  productDateRange,
  setProductDateRange,
  priceMin,
  setPriceMin,
  priceMax,
  setPriceMax,
  categoryName,
  setCategoryName,
  downloadReportPdf,
  downloadReportExcel,
  reportData = [],
  categoriesData,
  isLoadingCategories,
  isLoading,
}: ProductFiltersProps) {
  return (
    <>
      <ProductFiltersForm
        productDateRange={productDateRange}
        setProductDateRange={setProductDateRange}
        priceMin={priceMin}
        setPriceMin={setPriceMin}
        priceMax={priceMax}
        setPriceMax={setPriceMax}
        categoryName={categoryName}
        setCategoryName={setCategoryName}
        downloadReportPdf={downloadReportPdf}
        downloadReportExcel={downloadReportExcel}
        categoriesData={categoriesData}
        isLoadingCategories={isLoadingCategories}
        isLoading={isLoading}
      />
      <ProductReportTable reportData={reportData} />
    </>
  );
}
