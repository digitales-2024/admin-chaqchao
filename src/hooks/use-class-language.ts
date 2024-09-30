import {
  useCreateClassLanguageMutation,
  useDeleteClassLanguageMutation,
  useGetClassLanguagesAllQuery,
  useUpdateClassLanguageMutation,
} from "@/redux/services/classLanguageConfigApi";
import { ClassLanguageData, CustomErrorData } from "@/types";
import { translateError } from "@/utils/translateError";
import { toast } from "sonner";
export const useClassLanguages = () => {
  const {
    data: dataClassLanguagesAll,
    error,
    isLoading,
    isSuccess,
    refetch,
  } = useGetClassLanguagesAllQuery();

  const [createClassLanguage] = useCreateClassLanguageMutation();

  const [updateClassLanguage] = useUpdateClassLanguageMutation();

  const [deleteClassLanguage] = useDeleteClassLanguageMutation();

  const onCreateClassLanguage = async (input: Partial<ClassLanguageData>) => {
    const promise = () =>
      new Promise(async (resolve, reject) => {
        try {
          const result = await createClassLanguage(input);
          if (
            result.error &&
            typeof result.error === "object" &&
            "data" in result.error
          ) {
            const error = (result.error.data as CustomErrorData).message;
            const message = translateError(error as string);
            reject(new Error(message));
          }
          if (result.error) {
            reject(
              new Error(
                "Ocurrió un error inesperado, por favor intenta de nuevo",
              ),
            );
          }
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });

    return toast.promise(promise(), {
      loading: "Creando idioma de clase...",
      success: "Idioma de clase creado con éxito",
      error: (err) => err.message,
    });
  };

  const onUpdateClassLanguage = async (
    input: Partial<ClassLanguageData> & { id: string },
  ) => {
    const promise = () =>
      new Promise(async (resolve, reject) => {
        try {
          const result = await updateClassLanguage(input);
          if (
            result.error &&
            typeof result.error === "object" &&
            "data" in result.error
          ) {
            const error = (result.error.data as CustomErrorData).message;
            const message = translateError(error as string);
            reject(new Error(message));
          }
          if (result.error) {
            reject(
              new Error(
                "Ocurrió un error inesperado, por favor intenta de nuevo",
              ),
            );
          }
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });

    return toast.promise(promise(), {
      loading: "Actualizando idioma de clase...",
      success: "Idioma de clase actualizado con éxito",
      error: (err) => err.message,
    });
  };

  const onDeleteClassLanguage = async (id: string) => {
    const promise = () =>
      new Promise(async (resolve, reject) => {
        try {
          const result = await deleteClassLanguage({ id });
          if (
            result.error &&
            typeof result.error === "object" &&
            "data" in result.error
          ) {
            const error = (result.error.data as CustomErrorData).message;
            const message = translateError(error as string);
            reject(new Error(message));
          } else if (result.error) {
            reject(
              new Error(
                "Ocurrió un error inesperado, por favor intenta de nuevo",
              ),
            );
          } else {
            resolve(result);
          }
        } catch (error) {
          reject(error);
        }
      });

    return toast.promise(promise(), {
      loading: "Eliminando lenguaje de clase...",
      success: "Lenguaje de clase eliminado con éxito",
      error: (err) => err.message,
    });
  };

  return {
    dataClassLanguagesAll,
    error,
    isLoading,
    isSuccess,
    refetch,
    onCreateClassLanguage,
    onUpdateClassLanguage,
    onDeleteClassLanguage,
  };
};
