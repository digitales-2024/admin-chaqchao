import {
  useExportOrdersToPdfMutation,
  useExportOrdersToExcelMutation,
  useExportProductsToPdfMutation,
  useExportProductsToExcelMutation,
  useExportTopProductsToPdfMutation,
  useExportTopProductsToExcelMutation,
  useGetProductsReportQuery,
  useGetOrdersReportQuery,
} from "@/redux/services/reportsApi";
import { FilterOrdersSchema } from "@/schemas/reports/filterOrdersSchema";
import { FilterProductSchema } from "@/schemas/reports/filterProductSchema";
import { toast } from "sonner";

// Hook para exportar y obtener reportes
export const useReports = () => {
  // Mutaciones para exportar órdenes y productos
  const [exportOrdersToPdf] = useExportOrdersToPdfMutation();
  const [exportOrdersToExcel] = useExportOrdersToExcelMutation();
  const [exportProductsToPdf] = useExportProductsToPdfMutation();
  const [exportProductsToExcel] = useExportProductsToExcelMutation();
  const [exportTopProductsToPdf] = useExportTopProductsToPdfMutation();
  const [exportTopProductsToExcel] = useExportTopProductsToExcelMutation();

  // Obtener reportes de productos
  const useGetProductsReport = (filter: FilterProductSchema) => {
    return useGetProductsReportQuery({ filter });
  };

  // Obtener reportes de órdenes
  const useGetOrdersReport = (filter: FilterOrdersSchema) => {
    return useGetOrdersReportQuery({ filter });
  };

  // Función para exportar las órdenes a PDF
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
          resolve("Órdenes exportadas a PDF con éxito");
        } catch (error) {
          console.error("Error al exportar órdenes a PDF:", error);
          reject(new Error("Error al exportar órdenes a PDF"));
        }
      });

    return toast.promise(promise(), {
      loading: "Exportando órdenes a PDF...",
      success: "Órdenes exportadas a PDF con éxito",
      error: (err) => err.message,
    });
  };

  // Función para exportar las órdenes a Excel
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
          resolve("Órdenes exportadas a Excel con éxito");
        } catch (error) {
          console.error("Error al exportar órdenes a Excel:", error);
          reject(new Error("Error al exportar órdenes a Excel"));
        }
      });

    return toast.promise(promise(), {
      loading: "Exportando órdenes a Excel...",
      success: "Órdenes exportadas a Excel con éxito",
      error: (err) => err.message,
    });
  };

  // Función para exportar los productos a PDF
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
          console.error("Error al exportar productos a PDF:", error);
          reject(new Error("Error al exportar productos a PDF"));
        }
      });

    return toast.promise(promise(), {
      loading: "Exportando productos a PDF...",
      success: "Productos exportados a PDF con éxito",
      error: (err) => err.message,
    });
  };

  // Función para exportar los productos a Excel
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
          console.error("Error al exportar productos a Excel:", error);
          reject(new Error("Error al exportar productos a Excel"));
        }
      });

    return toast.promise(promise(), {
      loading: "Exportando productos a Excel...",
      success: "Productos exportados a Excel con éxito",
      error: (err) => err.message,
    });
  };

  // Función para exportar productos top a PDF
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
          console.error("Error al exportar productos top a PDF:", error);
          reject(new Error("Error al exportar productos top a PDF"));
        }
      });

    return toast.promise(promise(), {
      loading: "Exportando productos top a PDF...",
      success: "Productos top exportados a PDF con éxito",
      error: (err) => err.message,
    });
  };

  // Función para exportar productos top a Excel
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
          console.error("Error al exportar productos top a Excel:", error);
          reject(new Error("Error al exportar productos top a Excel"));
        }
      });

    return toast.promise(promise(), {
      loading: "Exportando productos top a Excel...",
      success: "Productos top exportados a Excel con éxito",
      error: (err) => err.message,
    });
  };

  // Retornamos todas las funciones y estados necesarios
  return {
    exportOrdersReportToPdf,
    exportOrdersReportToExcel,
    exportProductsReportToPdf,
    exportProductsReportToExcel,
    exportTopProductsReportToPdf,
    exportTopProductsReportToExcel,
    useGetOrdersReport,
    useGetProductsReport,
  };
};