import { useBussinessConfig } from "@/hooks/use-business-config";
import { useClassLanguages } from "@/hooks/use-class-language";
import {
  CreateClassLanguageSchema,
  createClassLanguageSchema,
} from "@/schemas/classConfig/createClassLanguageSchema";
import { ClassLanguageData } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm, Controller, FormProvider } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";

interface EditLanguageSheetProps {
  isOpen: boolean;
  onClose: () => void;
  languageData: ClassLanguageData;
  refetchClassLanguages: () => void;
}

export function EditLanguageSheet({
  isOpen,
  onClose,
  languageData,
  refetchClassLanguages,
}: EditLanguageSheetProps) {
  const { onUpdateClassLanguage } = useClassLanguages();
  const { dataBusinessConfigAll, isSuccess: isSuccessBusinessConfig } =
    useBussinessConfig();

  const methods = useForm<CreateClassLanguageSchema>({
    resolver: zodResolver(createClassLanguageSchema),
    defaultValues: {
      languageName: languageData.languageName,
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = methods;

  // Reset form when languageData changes
  useEffect(() => {
    reset({
      languageName: languageData.languageName,
    });
  }, [languageData, reset]);

  const onSubmit = async (data: CreateClassLanguageSchema) => {
    if (
      isSuccessBusinessConfig &&
      dataBusinessConfigAll &&
      dataBusinessConfigAll.length > 0
    ) {
      const businessId = dataBusinessConfigAll[0].id;
      await onUpdateClassLanguage({
        ...data,
        id: languageData.id,
        businessId,
      });
      reset();
      refetchClassLanguages();
      onClose();
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Editar Lenguaje de la Clase</SheetTitle>
          <SheetDescription>
            Modifica el lenguaje de la clase a continuación.
          </SheetDescription>
        </SheetHeader>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
            <div className="space-y-4">
              {/* Input for price */}
              <div className="space-y-2">
                <Label htmlFor="languageName">Lenguaje</Label>
                <Controller
                  name="languageName"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="languageName"
                      type="text"
                      value={field.value}
                      onChange={(e) => field.onChange(String(e.target.value))}
                    />
                  )}
                />
                {errors.languageName && (
                  <p className="text-sm text-red-500">
                    {errors.languageName.message}
                  </p>
                )}
              </div>
            </div>
            <SheetFooter className="mt-6 flex justify-end space-x-2">
              <div className="flex flex-row-reverse flex-wrap gap-2">
                <Button type="submit">Actualizar Lenguaje</Button>
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancelar
                </Button>
              </div>
            </SheetFooter>
          </form>
        </FormProvider>
      </SheetContent>
    </Sheet>
  );
}
