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
import { toast } from "sonner";

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
    const promise = () =>
      new Promise(async (resolve, reject) => {
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

          resolve("Pedidos exportadas a PDF con éxito");
        } catch (error) {
          console.error("Error exporting orders to PDF:", error);
          reject(new Error("Error al exportar órdenes a PDF"));
        }
      });

    return toast.promise(promise(), {
      loading: "Exportando pedidos a PDF...",
      success: "Pedidos exportadas a PDF con éxito",
      error: (err) => err.message,
    });
  };

  /**
   * Descargar las órdenes en un archivo Excel
   * @param filter Filtros de órdenes
   * @returns Excel Blob
   */
  const exportOrdersReportToExcel = async (filter: FilterOrdersSchema) => {
    const promise = () =>
      new Promise(async (resolve, reject) => {
        try {
          const response = await exportOrdersToExcel({ filter }).unwrap();

          const url = window.URL.createObjectURL(new Blob([response]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "orders_report.xlsx");
          document.body.appendChild(link);
          link.click();
          link.remove();

          resolve("Pedidos exportadas a Excel con éxito");
        } catch (error) {
          console.error("Error exporting orders to Excel:", error);
          reject(new Error("Error al exportar órdenes a Excel"));
        }
      });

    return toast.promise(promise(), {
      loading: "Exportando pedidos a Excel...",
      success: "Pedidos exportadas a Excel con éxito",
      error: (err) => err.message,
    });
  };

  /**
   * Descargar los productos en un archivo PDF
   * @param filter Filtros de productos
   */
  const exportProductsReportToPdf = async (filter: FilterProductSchema) => {
    const promise = () =>
      new Promise(async (resolve, reject) => {
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

          resolve("Productos exportados a PDF con éxito");
        } catch (error) {
          console.error("Error exporting products to PDF:", error);
          reject(new Error("Error al exportar productos a PDF"));
        }
      });

    return toast.promise(promise(), {
      loading: "Exportando productos a PDF...",
      success: "Productos exportados a PDF con éxito",
      error: (err) => err.message,
    });
  };

  /**
   * Descargar los productos en un archivo Excel
   * @param filter Filtros de productos
   * @returns Excel Blob
   */
  const exportProductsReportToExcel = async (filter: FilterProductSchema) => {
    const promise = () =>
      new Promise(async (resolve, reject) => {
        try {
          const response = await exportProductsToExcel({ filter }).unwrap();

          const url = window.URL.createObjectURL(new Blob([response]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "products_report.xlsx");
          document.body.appendChild(link);
          link.click();
          link.remove();

          resolve("Productos exportados a Excel con éxito");
        } catch (error) {
          console.error("Error exporting products to Excel:", error);
          reject(new Error("Error al exportar productos a Excel"));
        }
      });

    return toast.promise(promise(), {
      loading: "Exportando productos a Excel...",
      success: "Productos exportados a Excel con éxito",
      error: (err) => err.message,
    });
  };

  /**
   * Descargar los productos top en un archivo PDF
   * @param filter Filtros de productos top
   */
  const exportTopProductsReportToPdf = async (filter: FilterProductSchema) => {
    const promise = () =>
      new Promise(async (resolve, reject) => {
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

          resolve("Productos top exportados a PDF con éxito");
        } catch (error) {
          console.error("Error exporting top products to PDF:", error);
          reject(new Error("Error al exportar productos top a PDF"));
        }
      });

    return toast.promise(promise(), {
      loading: "Exportando productos top a PDF...",
      success: "Productos top exportados a PDF con éxito",
      error: (err) => err.message,
    });
  };

  /**
   * Descargar los productos top en un archivo Excel
   * @param filter Filtros de productos top
   * @returns Excel Blob
   */
  const exportTopProductsReportToExcel = async (
    filter: FilterProductSchema,
  ) => {
    const promise = () =>
      new Promise(async (resolve, reject) => {
        try {
          const response = await exportTopProductsToExcel({ filter }).unwrap();

          const url = window.URL.createObjectURL(new Blob([response]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "top_products_report.xlsx");
          document.body.appendChild(link);
          link.click();
          link.remove();

          resolve("Productos top exportados a Excel con éxito");
        } catch (error) {
          console.error("Error exporting top products to Excel:", error);
          reject(new Error("Error al exportar productos top a Excel"));
        }
      });

    return toast.promise(promise(), {
      loading: "Exportando productos top a Excel...",
      success: "Productos top exportados a Excel con éxito",
      error: (err) => err.message,
    });
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
