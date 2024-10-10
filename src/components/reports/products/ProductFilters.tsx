import { ProductData, Category } from "@/types";
import React from "react";

import { ProductFiltersForm } from "./ProductFiltersForm";
import { ProductReportTable } from "./ProductReportTable";

interface ProductFiltersProps {
  productName: string;
  setProductName: (value: string) => void;
  productDateRange: { from: string; to: string };
  setProductDateRange: (value: { from: string; to: string }) => void;
  priceMin: string;
  setPriceMin: (value: string) => void;
  priceMax: string;
  setPriceMax: (value: string) => void;
  isActive: boolean;
  setIsProductActive: (value: boolean) => void;
  isRestricted: boolean;
  setIsRestricted: (value: boolean) => void;
  isAvailable: boolean;
  setIsAvailable: (value: boolean) => void;
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
  productName,
  setProductName,
  productDateRange,
  setProductDateRange,
  priceMin,
  setPriceMin,
  priceMax,
  setPriceMax,
  isActive,
  setIsProductActive,
  isRestricted,
  setIsRestricted,
  isAvailable,
  setIsAvailable,
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
        productName={productName}
        setProductName={setProductName}
        productDateRange={productDateRange}
        setProductDateRange={setProductDateRange}
        priceMin={priceMin}
        setPriceMin={setPriceMin}
        priceMax={priceMax}
        setPriceMax={setPriceMax}
        isActive={isActive}
        setIsProductActive={setIsProductActive}
        isRestricted={isRestricted}
        setIsRestricted={setIsRestricted}
        isAvailable={isAvailable}
        setIsAvailable={setIsAvailable}
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
