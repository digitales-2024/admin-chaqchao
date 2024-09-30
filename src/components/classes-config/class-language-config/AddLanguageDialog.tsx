import { useBussinessConfig } from "@/hooks/use-business-config";
import { useClassLanguages } from "@/hooks/use-class-language";
import { useMediaQuery } from "@/hooks/use-media-query";
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AddLanguageDialogProps {
  refetchClassLanguages: () => void;
}

const formData = {
  button: "Agregar Lenguaje",
  title: "Agregar Lenguaje de la Clase",
};

export function AddLanguageDialog({
  refetchClassLanguages,
}: AddLanguageDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  const { onCreateClassLanguage } = useClassLanguages();
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

  const isDesktop = useMediaQuery("(min-width: 624px)");

  if (isDesktop) {
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>
          <Plus className="h-4 w-4" />
          {formData.button}
        </Button>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{formData.title}</DialogTitle>
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
                          onChange={(e) =>
                            field.onChange(String(e.target.value))
                          }
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
                <DialogFooter>
                  <div className="mt-6 flex flex-row-reverse flex-wrap gap-2">
                    <Button type="submit">Agregar Lenguaje</Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsOpen(false)}
                    >
                      Cancelar
                    </Button>
                  </div>
                </DialogFooter>
              </form>
            </FormProvider>
          </DialogContent>
        </Dialog>
      </>
    );
  }
  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button onClick={() => setIsOpen(true)}>
          <Plus className="h-4 w-4" />
          {formData.button}
        </Button>
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{formData.title}</DrawerTitle>
        </DrawerHeader>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-4 space-y-4 p-4">
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
            <DrawerFooter>
              <Button type="submit">Agregar Lenguaje</Button>
              <DrawerClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                >
                  Cancelar
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </form>
        </FormProvider>
      </DrawerContent>
    </Drawer>
  );
}
