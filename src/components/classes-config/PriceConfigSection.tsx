import { useClassPrices } from "@/hooks/use-class-price";
import { ClassPriceConfigData } from "@/types";
import { Edit, Trash, Ellipsis, DollarSign } from "lucide-react";
import { useState } from "react";

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
    <div className="container mx-auto py-5">
      <div className="mb-8 flex items-center justify-between px-4">
        <div>
          <h2 className="text-2xl font-bold">Configuración de Precios</h2>
          <span className="text-gray-600">
            Ingrese los detalles de los precios de las clases.
          </span>
        </div>
        <AddPriceDialog refetchClassPrices={refetchClassPrices} />
      </div>

      <div className="space-y-5">
        {isSuccessPrices &&
        dataClassPricesAll &&
        dataClassPricesAll.length > 0 ? (
          dataClassPricesAll.map((price) => (
            <Card key={price.id}>
              <CardContent className="mt-3 flex items-center justify-between">
                <div className="flex items-center">
                  {price.typeCurrency === "DOLAR" ? (
                    <DollarSign className="mr-4 mt-2" aria-hidden="true" />
                  ) : (
                    <span
                      className="mr-4 mt-2 cursor-default text-xl font-medium"
                      aria-hidden="true"
                    >
                      S/
                    </span>
                  )}
                  <div>
                    <p className="mt-4 text-base font-semibold">
                      {price.classTypeUser === "ADULT" ? "Adulto" : "Niño"}
                    </p>
                    <p>
                      Precio: {price.typeCurrency === "DOLAR" ? "$" : "S/"}{" "}
                      {price.price}
                    </p>
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
                        <Ellipsis className="size-4" aria-hidden="true" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                      <DropdownMenuItem onSelect={() => handleEdit(price)}>
                        Editar
                        <DropdownMenuShortcut>
                          <Edit className="size-4" aria-hidden="true" />
                        </DropdownMenuShortcut>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onSelect={() => handleDelete(price)}>
                        Eliminar
                        <DropdownMenuShortcut>
                          <Trash className="size-4" aria-hidden="true" />
                        </DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p>No hay precios configurados.</p>
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
