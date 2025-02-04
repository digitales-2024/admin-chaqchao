import { useClassPrices } from "@/hooks/use-class-price";
import {
  ClassPriceConfigData,
  TypeClass,
  typeClassColors,
  typeClassLabels,
} from "@/types";
import { Edit, Trash, Ellipsis, DollarSign, Info } from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";

import { cn } from "@/lib/utils";

import { AddPriceDialog } from "./AddPriceDialog";
import { DeletePriceDialog } from "./DeletePriceDialog";
import { EditPriceSheet } from "./EditPriceSheet";

export function PriceConfigSection() {
  const [selectedPrice, setSelectedPrice] =
    useState<ClassPriceConfigData | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [priceToDelete, setPriceToDelete] =
    useState<ClassPriceConfigData | null>(null);

  const {
    dataClassPricesAll,
    isSuccess: isSuccessPrices,
    refetch: refetchClassPrices,
  } = useClassPrices();

  // Función para editar
  const handleEdit = (priceData: ClassPriceConfigData) => {
    setSelectedPrice(priceData);
    setIsEditOpen(true);
  };

  // Función para eliminar
  const handleDelete = (priceData: ClassPriceConfigData) => {
    setPriceToDelete(priceData);
    setShowDeleteDialog(true);
  };

  return (
    <div className="container mx-auto flex flex-col py-5">
      <div className="mb-8 flex flex-wrap items-center justify-between px-4">
        <div>
          <h2 className="text-2xl font-bold">Configuración de Precios</h2>
          <span className="text-gray-600">
            Ingrese los detalles de los precios de las clases.
          </span>
        </div>
        <AddPriceDialog refetchClassPrices={refetchClassPrices} />
      </div>

      <div className="space-y-5">
        {isSuccessPrices && dataClassPricesAll ? (
          Object.keys(TypeClass).map((type) => {
            const schedules =
              dataClassPricesAll[type as keyof typeof dataClassPricesAll];
            return (
              <div key={type}>
                <h4
                  className={cn(
                    "text-xs font-semibold",
                    typeClassColors[type as keyof typeof TypeClass],
                    "bg-transparent",
                  )}
                >
                  {typeClassLabels[type as keyof typeof TypeClass]}
                </h4>
                <div
                  className={cn(
                    "space-y-5 rounded-lg border p-4",
                    typeClassColors[type as keyof typeof TypeClass],
                  )}
                >
                  {schedules?.map((price) => (
                    <Card key={price.id}>
                      <CardContent className="flex items-center justify-between text-slate-800">
                        <div className="flex items-center">
                          <div>
                            <p
                              className="mt-4 text-base font-semibold"
                              aria-hidden="true"
                            >
                              {price.classTypeUser === "ADULT"
                                ? "Adulto"
                                : "Niño"}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              <Badge variant="outline" className="flex gap-2">
                                {price.typeCurrency === "DOLAR" ? (
                                  <DollarSign
                                    className="size-4 text-blue-500"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <span
                                    className="cursor-default select-none text-xs font-medium text-cyan-500"
                                    aria-hidden="true"
                                  >
                                    S/
                                  </span>
                                )}
                                Precio:
                              </Badge>
                              <span>
                                {price.typeCurrency === "DOLAR" ? "$" : "S/"}{" "}
                                {price.price}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                aria-label="Open menu"
                                variant="ghost"
                                className="flex size-8 p-0 data-[state=open]:bg-muted"
                              >
                                <Ellipsis
                                  className="size-4"
                                  aria-hidden="true"
                                />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-40">
                              <DropdownMenuItem
                                onSelect={() => handleEdit(price)}
                              >
                                Editar
                                <DropdownMenuShortcut>
                                  <Edit className="size-4" aria-hidden="true" />
                                </DropdownMenuShortcut>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onSelect={() => handleDelete(price)}
                              >
                                Eliminar
                                <DropdownMenuShortcut>
                                  <Trash
                                    className="size-4"
                                    aria-hidden="true"
                                  />
                                </DropdownMenuShortcut>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })
        ) : (
          <Badge className="font-medium text-slate-400" variant="outline">
            <Info className="mr-2 size-3" aria-hidden="true" />
            No hay precios configurados
          </Badge>
        )}
      </div>

      {selectedPrice && (
        <EditPriceSheet
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          priceData={selectedPrice}
          refetchClassPrices={refetchClassPrices}
        />
      )}

      {priceToDelete && (
        <DeletePriceDialog
          price={priceToDelete}
          onSuccess={refetchClassPrices}
          open={showDeleteDialog}
          onOpenChange={setShowDeleteDialog}
        />
      )}
    </div>
  );
}
