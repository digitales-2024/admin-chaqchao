import {
  useExportOrdersToPdfMutation,
  useExportOrdersToExcelMutation,
  useExportProductsToPdfMutation,
  useExportProductsToExcelMutation,
  useExportTopProductsToPdfMutation,
  useExportTopProductsToExcelMutation,
  useGetProductsReportQuery,
  useGetOrdersReportQuery,
  useGetTopProductsReportQuery,
} from "@/redux/services/reportsApi";
import { FilterOrdersSchema } from "@/schemas/reports/filterOrdersSchema";
import {
  FilterProductSchema,
  FilterTopProductsSchema,
} from "@/schemas/reports/filterProductSchema";
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
    return useGetProductsReportQuery(
      { filter },
      { refetchOnMountOrArgChange: true },
    );
  };

  // Obtener reportes de órdenes
  const useGetOrdersReport = (filter: FilterOrdersSchema) => {
    return useGetOrdersReportQuery(
      { filter },
      { refetchOnMountOrArgChange: true },
    );
  };

  // Obtener reportes de productos top
  const useGetTopProductsReport = (filter: FilterTopProductsSchema) => {
    return useGetTopProductsReportQuery(
      { filter },
      { refetchOnMountOrArgChange: true },
    );
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
          resolve("Productos en tendencia exportados a PDF con éxito");
        } catch (error) {
          reject(new Error("Error al exportar productos en tendencia a PDF"));
        }
      });

    return toast.promise(promise(), {
      loading: "Exportando productos en tendencia a PDF...",
      success: "Productos en tendencia exportados a PDF con éxito",
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
          resolve("Productos en tendencia exportados a Excel con éxito");
        } catch (error) {
          reject(new Error("Error al exportar productos en tendencia a Excel"));
        }
      });

    return toast.promise(promise(), {
      loading: "Exportando productos en tendencia a Excel...",
      success: "Productos en tendencia exportados a Excel con éxito",
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
    useGetTopProductsReport,
  };
};
