// components/EditPriceSheet.tsx

import { useBussinessConfig } from "@/hooks/use-business-config";
import { useUpdateClassPrice } from "@/hooks/use-class-price";
import {
  createClassPriceSchema,
  CreateClassPriceSchema,
} from "@/schemas/classConfig/createClassPriceSchema";
import { ClassPriceConfigData } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm, Controller, FormProvider } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";

interface EditPriceSheetProps {
  isOpen: boolean;
  onClose: () => void;
  priceData: ClassPriceConfigData;
  refetchClassPrices: () => void;
}

export function EditPriceSheet({
  isOpen,
  onClose,
  priceData,
  refetchClassPrices,
}: EditPriceSheetProps) {
  const { onUpdateClassPrice } = useUpdateClassPrice();
  const { dataBusinessConfigAll, isSuccess: isSuccessBusinessConfig } =
    useBussinessConfig();

  const methods = useForm<CreateClassPriceSchema>({
    resolver: zodResolver(createClassPriceSchema),
    defaultValues: {
      classTypeUser: priceData.classTypeUser,
      price: priceData.price,
      typeCurrency: priceData.typeCurrency,
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = methods;

  // Reset form when priceData changes
  useEffect(() => {
    reset({
      classTypeUser: priceData.classTypeUser,
      price: priceData.price,
      typeCurrency: priceData.typeCurrency,
    });
  }, [priceData, reset]);

  const onSubmit = async (data: CreateClassPriceSchema) => {
    if (
      isSuccessBusinessConfig &&
      dataBusinessConfigAll &&
      dataBusinessConfigAll.length > 0
    ) {
      const businessId = dataBusinessConfigAll[0].id;
      await onUpdateClassPrice({
        ...data,
        id: priceData.id,
        businessId,
      });
      reset();
      refetchClassPrices();
      onClose();
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Editar Precio de la Clase</SheetTitle>
          <SheetDescription>
            Modifica los detalles del precio de la clase a continuación.
          </SheetDescription>
        </SheetHeader>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
            <div className="space-y-4">
              {/* Select for classTypeUser */}
              <div className="space-y-2">
                <Label htmlFor="classTypeUser">Tipo de Usuario</Label>
                <Controller
                  name="classTypeUser"
                  control={control}
                  render={({ field }) => (
                    <Select
                      key={field.value || "empty"}
                      onValueChange={(value) => field.onChange(value)}
                      defaultValue={field.value || ""}
                    >
                      <FormControl>
                        <SelectTrigger
                          id="classTypeUser"
                          className="capitalize"
                        >
                          <SelectValue placeholder="Selecciona un tipo de usuario" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="ADULT">Adulto</SelectItem>
                          <SelectItem value="CHILD">Niño</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.classTypeUser && (
                  <p className="text-sm text-red-500">
                    {errors.classTypeUser.message}
                  </p>
                )}
              </div>

              {/* Select for typeCurrency */}
              <div className="space-y-2">
                <Label htmlFor="typeCurrency">Tipo de Moneda</Label>
                <Controller
                  name="typeCurrency"
                  control={control}
                  render={({ field }) => (
                    <Select
                      key={field.value || "empty"}
                      onValueChange={(value) => field.onChange(value)}
                      defaultValue={field.value || ""}
                    >
                      <FormControl>
                        <SelectTrigger id="typeCurrency" className="capitalize">
                          <SelectValue placeholder="Selecciona una moneda" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="DOLAR">Dólar</SelectItem>
                          <SelectItem value="SOL">Sol</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.typeCurrency && (
                  <p className="text-sm text-red-500">
                    {errors.typeCurrency.message}
                  </p>
                )}
              </div>

              {/* Input for price */}
              <div className="space-y-2">
                <Label htmlFor="price">Precio</Label>
                <Controller
                  name="price"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="price"
                      type="number"
                      value={field.value}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  )}
                />
                {errors.price && (
                  <p className="text-sm text-red-500">{errors.price.message}</p>
                )}
              </div>
            </div>
            <SheetFooter className="mt-6 flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit">Actualizar Precio</Button>
            </SheetFooter>
          </form>
        </FormProvider>
      </SheetContent>
    </Sheet>
  );
}
