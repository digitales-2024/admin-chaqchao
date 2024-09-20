// components/AddPriceDialog.tsx

import { useBussinessConfig } from "@/hooks/use-business-config";
import { useCreateClassPrice } from "@/hooks/use-class-price";
import {
  createClassPriceSchema,
  CreateClassPriceSchema,
} from "@/schemas/classConfig/createClassPriceSchema";
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

interface AddPriceDialogProps {
  refetchClassPrices: () => void;
}

export function AddPriceDialog({ refetchClassPrices }: AddPriceDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  const { onCreateClassPrice } = useCreateClassPrice();
  const { dataBusinessConfigAll, isSuccess: isSuccessBusinessConfig } =
    useBussinessConfig();

  const methods = useForm<CreateClassPriceSchema>({
    resolver: zodResolver(createClassPriceSchema),
    defaultValues: {
      classTypeUser: "",
      price: 0,
      typeCurrency: "",
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = methods;

  const onSubmit = async (data: CreateClassPriceSchema) => {
    if (
      isSuccessBusinessConfig &&
      dataBusinessConfigAll &&
      dataBusinessConfigAll.length > 0
    ) {
      const businessId = dataBusinessConfigAll[0].id;
      await onCreateClassPrice({ ...data, businessId });
      reset();
      refetchClassPrices();
      setIsOpen(false);
    }
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        <Plus className="h-4 w-4" />
        Agregar Precio
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Agregar Precio de la Clase</DialogTitle>
          </DialogHeader>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mt-4 space-y-4">
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
                          <SelectTrigger
                            id="typeCurrency"
                            className="capitalize"
                          >
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
                    <p className="text-sm text-red-500">
                      {errors.price.message}
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
                <Button type="submit">Agregar Precio</Button>
              </div>
            </form>
          </FormProvider>
        </DialogContent>
      </Dialog>
    </>
  );
}
