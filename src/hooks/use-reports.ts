import {
  useExportOrdersToPdfMutation,
  useExportOrdersToExcelMutation,
  useExportProductsToPdfMutation,
  useExportProductsToExcelMutation,
  useExportTopProductsToPdfMutation,
  useExportTopProductsToExcelMutation,
} from "@/redux/services/reportsApi";
import { FilterOrdersSchema } from "@/schemas/reports/filterOrdersSchema";
import { FilterProductSchema } from "@/schemas/reports/filterProductSchema";

// Hook para exportar reportes
export const useReports = () => {
  const [
    exportOrdersToPdf,
    { isLoading: isLoadingExportOrdersPdf, error: errorExportOrdersPdf },
  ] = useExportOrdersToPdfMutation();

  const [
    exportOrdersToExcel,
    { isLoading: isLoadingExportOrdersExcel, error: errorExportOrdersExcel },
  ] = useExportOrdersToExcelMutation();

  const [
    exportProductsToPdf,
    { isLoading: isLoadingExportProductsPdf, error: errorExportProductsPdf },
  ] = useExportProductsToPdfMutation();

  const [
    exportProductsToExcel,
    {
      isLoading: isLoadingExportProductsExcel,
      error: errorExportProductsExcel,
    },
  ] = useExportProductsToExcelMutation();

  const [
    exportTopProductsToPdf,
    {
      isLoading: isLoadingExportTopProductsPdf,
      error: errorExportTopProductsPdf,
    },
  ] = useExportTopProductsToPdfMutation();

  const [
    exportTopProductsToExcel,
    {
      isLoading: isLoadingExportTopProductsExcel,
      error: errorExportTopProductsExcel,
    },
  ] = useExportTopProductsToExcelMutation();

  /**
   * Descargar las órdenes en un archivo PDF
   * @param filter Filtros de órdenes
   */
  const exportOrdersReportToPdf = async (filter: FilterOrdersSchema) => {
    try {
      const response = await exportOrdersToPdf({ filter }).unwrap();

      const url = window.URL.createObjectURL(response);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "orders_report.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error exporting orders to PDF:", error);
      throw error;
    }
  };

  /**
   * Descargar las órdenes en un archivo Excel
   * @param filter Filtros de órdenes
   * @returns Excel Blob
   */
  const exportOrdersReportToExcel = async (filter: FilterOrdersSchema) => {
    try {
      const response = await exportOrdersToExcel({ filter }).unwrap();

      const url = window.URL.createObjectURL(new Blob([response]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "orders_report.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();

      return response;
    } catch (error) {
      console.error("Error exporting orders to Excel:", error);
      throw error;
    }
  };

  /**
   * Descargar los productos en un archivo PDF
   * @param filter Filtros de productos
   */
  const exportProductsReportToPdf = async (filter: FilterProductSchema) => {
    try {
      const response = await exportProductsToPdf({ filter }).unwrap();

      const url = window.URL.createObjectURL(response);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "products_report.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error exporting products to PDF:", error);
      throw error;
    }
  };

  /**
   * Descargar los productos en un archivo Excel
   * @param filter Filtros de productos
   * @returns Excel Blob
   */
  const exportProductsReportToExcel = async (filter: FilterProductSchema) => {
    try {
      const response = await exportProductsToExcel({ filter }).unwrap();

      const url = window.URL.createObjectURL(new Blob([response]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "products_report.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();

      return response;
    } catch (error) {
      console.error("Error exporting products to Excel:", error);
      throw error;
    }
  };

  /**
   * Descargar los productos top en un archivo PDF
   * @param filter Filtros de productos top
   */
  const exportTopProductsReportToPdf = async (filter: FilterProductSchema) => {
    try {
      const response = await exportTopProductsToPdf({ filter }).unwrap();

      const url = window.URL.createObjectURL(response);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "top_products_report.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error exporting top products to PDF:", error);
      throw error;
    }
  };

  /**
   * Descargar los productos top en un archivo Excel
   * @param filter Filtros de productos top
   * @returns Excel Blob
   */
  const exportTopProductsReportToExcel = async (
    filter: FilterProductSchema,
  ) => {
    try {
      const response = await exportTopProductsToExcel({ filter }).unwrap();

      const url = window.URL.createObjectURL(new Blob([response]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "top_products_report.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();

      return response;
    } catch (error) {
      console.error("Error exporting top products to Excel:", error);
      throw error;
    }
  };

  return {
    exportOrdersReportToPdf,
    isLoadingExportOrdersPdf,
    errorExportOrdersPdf,
    exportOrdersReportToExcel,
    isLoadingExportOrdersExcel,
    errorExportOrdersExcel,
    exportProductsReportToPdf,
    isLoadingExportProductsPdf,
    errorExportProductsPdf,
    exportProductsReportToExcel,
    isLoadingExportProductsExcel,
    errorExportProductsExcel,
    exportTopProductsReportToPdf,
    isLoadingExportTopProductsPdf,
    errorExportTopProductsPdf,
    exportTopProductsReportToExcel,
    isLoadingExportTopProductsExcel,
    errorExportTopProductsExcel,
  };
};
