"use client";

import { useCategories } from "@/hooks/use-categories";
import { useReports } from "@/hooks/use-reports";
import { FilterOrdersSchema } from "@/schemas/reports/filterOrdersSchema";
import { ProductData, ProductFilters } from "@/types";
import { OrderReportData, OrderStatus } from "@/types/orders";
import { addDays, format } from "date-fns";
import * as React from "react";

import { HeaderPage } from "@/components/common/HeaderPage";
import { Shell } from "@/components/common/Shell";
import { OrderFilters } from "@/components/reports/orders/OrderFilters";
import { ProductFilters as ProductFiltersComponent } from "@/components/reports/products/ProductFilters";
import { ReportTabs } from "@/components/reports/TabsContent";

export default function ReportsPage() {
  // Estados para filtros de productos
  const [productName, setProductName] = React.useState("");
  const [productDateRange, setProductDateRange] = React.useState({
    from: format(new Date(), "yyyy-MM-dd"),
    to: format(addDays(new Date(), 7), "yyyy-MM-dd"),
  });
  const [priceMin, setPriceMin] = React.useState("");
  const [priceMax, setPriceMax] = React.useState("");
  const [isActive, setIsActive] = React.useState(false);
  const [isRestricted, setIsRestricted] = React.useState(false);
  const [isAvailable, setIsAvailable] = React.useState(false);
  const [categoryName, setCategoryName] = React.useState("all");

  // Estados para filtros de órdenes
  const [orderDateRange, setOrderDateRange] = React.useState({
    from: format(new Date(), "yyyy-MM-dd"),
    to: format(addDays(new Date(), 7), "yyyy-MM-dd"),
  });
  const [orderStatus, setOrderStatus] = React.useState<OrderStatus>(
    OrderStatus.ALL,
  );
  const [totalAmount, setTotalAmount] = React.useState("");
  const [isOrderActive, setIsOrderActive] = React.useState(false);

  const [activeTab, setActiveTab] = React.useState("products");

  const {
    useGetProductsReport,
    exportProductsReportToPdf,
    exportProductsReportToExcel,
    useGetOrdersReport,
    exportOrdersReportToPdf,
    exportOrdersReportToExcel,
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

  // Estado para los filtros
  const [productFilters, setProductFilters] = React.useState<ProductFilters>(
    initialProductFilters,
  );
  const [orderFilters, setOrderFilters] =
    React.useState<FilterOrdersSchema>(initialOrderFilters);

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

  // Construimos los filtros para pasarlos al hook
  const finalProductFilters: ProductFilters = {
    startDate: productFilters.startDate,
    endDate: productFilters.endDate,
    name: productName || undefined,
    priceMin: priceMin ? parseFloat(priceMin) : undefined,
    priceMax: priceMax ? parseFloat(priceMax) : undefined,
    isActive: productFilters.isActive,
    isRestricted: productFilters.isRestricted,
    isAvailable: productFilters.isAvailable,
    categoryName: categoryName !== "all" ? categoryName : undefined,
  };

  const finalOrderFilters: FilterOrdersSchema = {
    startDate: orderFilters.startDate,
    endDate: orderFilters.endDate,
    orderStatus: orderStatus !== OrderStatus.ALL ? orderStatus : undefined,
    totalAmount: totalAmount ? parseFloat(totalAmount) : undefined,
    isActive: orderFilters.isActive,
  };

  // Pasamos los filtros al hook useGetProductsReport
  const {
    data: productsData = [] as ProductData[],
    isLoading: isLoadingProducts,
  } = useGetProductsReport(finalProductFilters);

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
              setProductDateRange(range);
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
              updateProductFilters({ isActive: value });
            }}
            isRestricted={isRestricted}
            setIsRestricted={(value) => {
              setIsRestricted(value);
              updateProductFilters({ isRestricted: value });
            }}
            isAvailable={isAvailable}
            setIsAvailable={(value) => {
              setIsAvailable(value);
              updateProductFilters({ isAvailable: value });
            }}
            categoryName={categoryName}
            setCategoryName={setCategoryName}
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
            totalAmount={totalAmount}
            setTotalAmount={setTotalAmount}
            isActive={isOrderActive}
            setIsOrderActive={(value) => {
              setIsOrderActive(value);
              updateOrderFilters({ isActive: value });
            }}
            isLoading={isLoadingOrders}
            downloadReportPdf={() => exportOrdersReportToPdf(finalOrderFilters)}
            downloadReportExcel={() =>
              exportOrdersReportToExcel(finalOrderFilters)
            }
            reportData={ordersData}
          />
        )}
      </ReportTabs>
    </Shell>
  );
}
