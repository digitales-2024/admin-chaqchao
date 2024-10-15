"use client";
import { useCategories } from "@/hooks/use-categories";
import { useReports } from "@/hooks/use-reports";
import { FilterOrdersSchema } from "@/schemas/reports/filterOrdersSchema";
import { FilterTopProductsSchema } from "@/schemas/reports/filterProductSchema";
import { ProductData, ProductFilters, TopProduct } from "@/types";
import { OrderReportData, OrderStatus } from "@/types/orders";
import { addDays, format } from "date-fns";
import * as React from "react";

import { HeaderPage } from "@/components/common/HeaderPage";
import { Shell } from "@/components/common/Shell";
import { OrderFilters } from "@/components/reports/orders/OrderFilters";
import { ProductFilters as ProductFiltersComponent } from "@/components/reports/products/ProductFilters";
import { ReportTabs } from "@/components/reports/TabsContent";
import { TopProductsFilters } from "@/components/reports/top-products/TopProductsFilters";

export default function ReportsPage() {
  // Estados para filtros de productos
  const [productName, setProductName] = React.useState("");
  const [productDateRange, setProductDateRange] = React.useState({
    from: format(new Date(), "yyyy-MM-dd"),
    to: format(addDays(new Date(), 7), "yyyy-MM-dd"),
  });

  const [topProductDateRange, setTopProductDateRange] = React.useState({
    from: format(new Date(), "yyyy-MM-dd"),
    to: format(addDays(new Date(), 7), "yyyy-MM-dd"),
  });
  const [priceMin, setPriceMin] = React.useState("");
  const [priceMax, setPriceMax] = React.useState("");
  const [isActive, setIsActive] = React.useState<string>("all");
  const [isRestricted, setIsRestricted] = React.useState<string>("all");
  const [isAvailable, setIsAvailable] = React.useState<string>("all");
  const [categoryName, setCategoryName] = React.useState("all");

  // Estados para filtros de órdenes
  const [orderDateRange, setOrderDateRange] = React.useState({
    from: format(new Date(), "yyyy-MM-dd"),
    to: format(addDays(new Date(), 7), "yyyy-MM-dd"),
  });
  const [orderStatus, setOrderStatus] = React.useState<OrderStatus>(
    OrderStatus.ALL,
  );
  const [orderPriceMin, setOrderPriceMin] = React.useState("");
  const [orderPriceMax, setOrderPriceMax] = React.useState("");

  // Estado para el filtro de top productos
  const [topValue, setTopValue] = React.useState("all");

  const [activeTab, setActiveTab] = React.useState("products");

  const {
    useGetProductsReport,
    useGetTopProductsReport,
    exportProductsReportToPdf,
    exportProductsReportToExcel,
    useGetOrdersReport,
    exportOrdersReportToPdf,
    exportOrdersReportToExcel,
    exportTopProductsReportToExcel,
    exportTopProductsReportToPdf,
  } = useReports();

  // Obtenemos las categorías
  const { data: categoriesData = [], isLoading: isLoadingCategories } =
    useCategories();

  // Construimos los filtros iniciales
  const initialProductFilters: ProductFilters = {
    startDate: productDateRange.from,
    endDate: productDateRange.to,
  };

  const initialOrderFilters: FilterOrdersSchema = {
    startDate: orderDateRange.from,
    endDate: orderDateRange.to,
  };

  const initialTopProductFilters: FilterTopProductsSchema = {
    startDate: productDateRange.from,
    endDate: productDateRange.to,
  };

  // Estado para los filtros
  const [productFilters, setProductFilters] = React.useState<ProductFilters>(
    initialProductFilters,
  );
  const [orderFilters, setOrderFilters] =
    React.useState<FilterOrdersSchema>(initialOrderFilters);
  const [topProductFilters, setTopProductFilters] =
    React.useState<FilterTopProductsSchema>(initialTopProductFilters);

  // Función para actualizar los filtros
  const updateProductFilters = (newFilters: Partial<ProductFilters>) => {
    setProductFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
    }));
  };

  const updateOrderFilters = (newFilters: Partial<FilterOrdersSchema>) => {
    setOrderFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
    }));
  };

  const updateTopProductFilters = (
    newFilters: Partial<FilterTopProductsSchema>,
  ) => {
    setTopProductFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
    }));
  };

  // Construimos los filtros para pasarlos al hook
  const finalProductFilters: ProductFilters = {
    startDate: productFilters.startDate,
    endDate: productFilters.endDate,
    name: productName || undefined,
    priceMin: priceMin ? parseFloat(priceMin) : undefined,
    priceMax: priceMax ? parseFloat(priceMax) : undefined,
    isActive: isActive !== "all" ? isActive === "true" : undefined,
    isRestricted: isRestricted !== "all" ? isRestricted === "true" : undefined,
    isAvailable: isAvailable !== "all" ? isAvailable === "true" : undefined,
    categoryName: categoryName !== "all" ? categoryName : undefined,
  };

  const finalOrderFilters: FilterOrdersSchema = {
    startDate: orderFilters.startDate,
    endDate: orderFilters.endDate,
    orderStatus: orderStatus !== OrderStatus.ALL ? orderStatus : undefined,
    priceMin: orderPriceMin ? parseFloat(orderPriceMin) : undefined,
    priceMax: orderPriceMax ? parseFloat(orderPriceMax) : undefined,
  };

  const finalTopProductFilters: FilterTopProductsSchema = {
    startDate: topProductFilters.startDate,
    endDate: topProductFilters.endDate,
  };

  // Pasamos los filtros al hook useGetProductsReport
  const {
    data: productsData = [] as ProductData[],
    isLoading: isLoadingProducts,
  } = useGetProductsReport(finalProductFilters);

  const {
    data: topProductsData = [] as TopProduct[],
    isLoading: isLoadingTopProducts,
  } = useGetTopProductsReport(finalTopProductFilters);

  // Pasamos los filtros al hook useGetOrdersReport
  const {
    data: ordersData = [] as OrderReportData[],
    isLoading: isLoadingOrders,
  } = useGetOrdersReport(finalOrderFilters);

  return (
    <Shell className="gap-6">
      <HeaderPage
        title="Reportes"
        description="Reportes de productos y de pedidos."
      />

      <ReportTabs activeTab={activeTab} setActiveTab={setActiveTab}>
        {activeTab === "products" && (
          <ProductFiltersComponent
            productName={productName}
            setProductName={setProductName}
            productDateRange={productDateRange}
            setProductDateRange={(range) => {
              setProductDateRange({
                ...range,
                to: range.to || format(addDays(new Date(), 7), "yyyy-MM-dd"),
              });
              updateProductFilters({
                startDate: range.from,
                endDate: range.to,
              });
            }}
            priceMin={priceMin}
            setPriceMin={setPriceMin}
            priceMax={priceMax}
            setPriceMax={setPriceMax}
            isActive={isActive}
            setIsProductActive={(value) => {
              setIsActive(value);
              updateProductFilters({
                isActive: value !== "all" ? value === "true" : undefined,
              });
            }}
            isRestricted={isRestricted}
            setIsRestricted={(value) => {
              setIsRestricted(value);
              updateProductFilters({
                isRestricted: value !== "all" ? value === "true" : undefined,
              });
            }}
            isAvailable={isAvailable}
            setIsAvailable={(value) => {
              setIsAvailable(value);
              updateProductFilters({
                isAvailable: value !== "all" ? value === "true" : undefined,
              });
            }}
            categoryName={categoryName}
            setCategoryName={(value) => {
              setCategoryName(value);
              updateProductFilters({
                categoryName: value !== "all" ? value : undefined,
              });
            }}
            categoriesData={categoriesData}
            isLoadingCategories={isLoadingCategories}
            isLoading={isLoadingProducts}
            downloadReportPdf={() =>
              exportProductsReportToPdf(finalProductFilters)
            }
            downloadReportExcel={() =>
              exportProductsReportToExcel(finalProductFilters)
            }
            reportData={productsData}
          />
        )}
        {activeTab === "orders" && (
          <OrderFilters
            orderDateRange={orderDateRange}
            setOrderDateRange={(range) => {
              setOrderDateRange({
                ...range,
                to: range.to || format(addDays(new Date(), 7), "yyyy-MM-dd"),
              });
              updateOrderFilters({
                startDate: range.from,
                endDate: range.to,
              });
            }}
            orderStatus={orderStatus}
            setOrderStatus={setOrderStatus}
            priceMin={orderPriceMin}
            setPriceMin={setOrderPriceMin}
            priceMax={orderPriceMax}
            setPriceMax={setOrderPriceMax}
            isLoading={isLoadingOrders}
            downloadReportPdf={() => exportOrdersReportToPdf(finalOrderFilters)}
            downloadReportExcel={() =>
              exportOrdersReportToExcel(finalOrderFilters)
            }
            reportData={ordersData}
          />
        )}
        {activeTab === "trends" && (
          <TopProductsFilters
            productDateRange={topProductDateRange}
            setProductDateRange={(range) => {
              setTopProductDateRange({
                ...range,
                to: range.to || format(addDays(new Date(), 7), "yyyy-MM-dd"),
              });
              updateTopProductFilters({
                startDate: range.from,
                endDate: range.to,
              });
            }}
            topValue={topValue}
            setTopValue={setTopValue}
            isLoading={isLoadingTopProducts}
            downloadReportPdf={() =>
              exportTopProductsReportToPdf(finalTopProductFilters)
            }
            downloadReportExcel={() =>
              exportTopProductsReportToExcel(finalTopProductFilters)
            }
            reportData={topProductsData}
          />
        )}
      </ReportTabs>
    </Shell>
  );
}
