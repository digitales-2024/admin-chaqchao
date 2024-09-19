import {
  useCreateClassLanguageMutation,
  useGetClassLanguagesAllQuery,
  useUpdateClassLanguageMutation,
} from "@/redux/services/classLanguageApi";
import { ClassLanguageData, CustomErrorData } from "@/types";
import { translateError } from "@/utils/translateError";
import { toast } from "sonner";
export const useClassLanguages = () => {
  const {
    data: dataClassLanguagesAll,
    error,
    isLoading,
    isSuccess,
  } = useGetClassLanguagesAllQuery();

  return { dataClassLanguagesAll, error, isLoading, isSuccess };
};

export const useCreateClassLanguage = () => {
  const [createClassLanguage] = useCreateClassLanguageMutation();

  const onCreateClassLanguage = async (input: Partial<ClassLanguageData>) => {
    const promise = () =>
      new Promise(async (resolve, reject) => {
        try {
          const result = await createClassLanguage(input);
          if (result.error && "data" in result.error) {
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

  return { onCreateClassLanguage };
};

export const useUpdateClassLanguage = () => {
  const [updateClassLanguage] = useUpdateClassLanguageMutation();

  const onUpdateClassLanguage = async (
    input: Partial<ClassLanguageData> & { id: string },
  ) => {
    const promise = () =>
      new Promise(async (resolve, reject) => {
        try {
          const result = await updateClassLanguage(input);
          if (result.error && "data" in result.error) {
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

  return { onUpdateClassLanguage };
};
