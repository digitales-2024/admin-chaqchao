import { useBussinessConfig } from "@/hooks/use-business-config";
import { useClassPrices } from "@/hooks/use-class-price";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  createClassPriceSchema,
  CreateClassPriceSchema,
} from "@/schemas/classConfig/createClassPriceSchema";
import { TypeClass, typeClassLabels } from "@/types";
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

const formData = {
  button: "Agregar Precio",
  title: "Agregar Precio de la Clase",
};

export function AddPriceDialog({ refetchClassPrices }: AddPriceDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  const { onCreateClassPrice } = useClassPrices();
  const { dataBusinessConfigAll, isSuccess: isSuccessBusinessConfig } =
    useBussinessConfig();

  const methods = useForm<CreateClassPriceSchema>({
    resolver: zodResolver(createClassPriceSchema),
    defaultValues: {
      typeClass: TypeClass.NORMAL,
      classTypeUser: "",
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
      await onCreateClassPrice({
        ...data,
        typeClass: data.typeClass as TypeClass,
        businessId,
      });
      reset();
      refetchClassPrices();
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
                  <div className="flex items-center justify-between gap-4">
                    <Label htmlFor="startTime">Tipo de clase</Label>
                    <Controller
                      name="typeClass"
                      control={control}
                      render={({ field }) => (
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona el tipo de clase" />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.keys(TypeClass).map((type) => (
                              <SelectItem key={type} value={type}>
                                {
                                  typeClassLabels[
                                    type as keyof typeof TypeClass
                                  ]
                                }
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.typeClass && (
                      <p className="text-sm text-red-500">
                        {errors.typeClass.message}
                      </p>
                    )}
                  </div>
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
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
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
                <DialogFooter>
                  <div className="mt-6 flex flex-row-reverse flex-wrap gap-2">
                    <Button type="submit">Agregar Precio</Button>
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
            <DrawerFooter>
              <Button type="submit">Agregar Precio</Button>
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
