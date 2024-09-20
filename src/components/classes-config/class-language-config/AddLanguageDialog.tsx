import { useBussinessConfig } from "@/hooks/use-business-config";
import { useCreateClassLanguage } from "@/hooks/use-class-language";
import {
  createClassLanguageSchema,
  CreateClassLanguageSchema,
} from "@/schemas/classConfig/createClassLanguageSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm, Controller, FormProvider } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AddLanguageDialogProps {
  refetchClassLanguages: () => void;
}

export function AddLanguageDialog({
  refetchClassLanguages,
}: AddLanguageDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  const { onCreateClassLanguage } = useCreateClassLanguage();
  const { dataBusinessConfigAll, isSuccess: isSuccessBusinessConfig } =
    useBussinessConfig();

  const methods = useForm<CreateClassLanguageSchema>({
    resolver: zodResolver(createClassLanguageSchema),
    defaultValues: {
      languageName: "",
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = methods;

  const onSubmit = async (data: CreateClassLanguageSchema) => {
    if (
      isSuccessBusinessConfig &&
      dataBusinessConfigAll &&
      dataBusinessConfigAll.length > 0
    ) {
      const businessId = dataBusinessConfigAll[0].id;
      await onCreateClassLanguage({ ...data, businessId });
      reset();
      refetchClassLanguages();
      setIsOpen(false);
    }
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        <Plus className="h-4 w-4" />
        Agregar Lenguaje
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Agregar Lenguaje de la Clase</DialogTitle>
          </DialogHeader>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mt-4 space-y-4">
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
              <div className="mt-6 flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                >
                  Cancelar
                </Button>
                <Button type="submit">Agregar Lenguaje</Button>
              </div>
            </form>
          </FormProvider>
        </DialogContent>
      </Dialog>
    </>
  );
}
