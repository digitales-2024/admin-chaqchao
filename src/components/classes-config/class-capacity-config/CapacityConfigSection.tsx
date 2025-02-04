import { useClassCapacity } from "@/hooks/use-class-capacity";
import {
  ClassCapacityData,
  TypeClass,
  typeClassColors,
  typeClassLabels,
} from "@/types";
import {
  Edit,
  Ellipsis,
  Info,
  Trash,
  UserRound,
  UsersRound,
} from "lucide-react";
import { useState } from "react";

import Loading from "@/components/common/Loading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { cn } from "@/lib/utils";

import { AddCapacityDialog } from "./AddCapacityDialog";
import { DeleteCapacityDialog } from "./DeleteCapacityDialog";
import { EditCapacitySheet } from "./EditCapacitySheet";

export function CapacityConfigSection() {
  const { refetchClassCapacities, classCapacities, isLoadingClassCapacities } =
    useClassCapacity();
  const [selectedCapacity, setSelectedCapacity] =
    useState<ClassCapacityData | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [capacityToDelete, setCapacityToDelete] =
    useState<ClassCapacityData | null>(null);
  // Función para editar
  const handleEdit = (capacityData: ClassCapacityData) => {
    setSelectedCapacity(capacityData);
    setIsEditOpen(true);
  };

  // Función para eliminar
  const handleDelete = (capacityData: ClassCapacityData) => {
    setCapacityToDelete(capacityData);
    setShowDeleteDialog(true);
  };
  return (
    <div className="container mx-auto flex flex-col py-5">
      <div className="mb-8 flex flex-wrap items-center justify-between px-4">
        <div>
          <h2 className="text-2xl font-bold">Configuración de Lenguaje</h2>
          <span className="text-gray-600">
            Ingrese los lenguajes de las clases.
          </span>
        </div>
        <AddCapacityDialog refetchCapacity={refetchClassCapacities} />
      </div>
      <div className="space-y-5">
        {isLoadingClassCapacities && <Loading />}
        {classCapacities ? (
          Object.keys(TypeClass).map((type) => {
            const capacity =
              classCapacities[type as keyof typeof classCapacities];
            return (
              <div key={type}>
                <h4 className="text-lg font-bold">
                  {typeClassLabels[type as keyof typeof TypeClass]}
                </h4>
                <div
                  className={cn(
                    "space-y-5 rounded-lg border p-4",
                    typeClassColors[type as keyof typeof TypeClass],
                  )}
                >
                  <Card>
                    <CardContent className="flex items-center justify-between text-slate-800">
                      <div className="flex flex-col items-center">
                        <div>
                          <p
                            className="mt-4 text-xs font-semibold"
                            aria-hidden="true"
                          >
                            Mínimo
                          </p>
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="outline" className="flex gap-2">
                              <UserRound className="size-4 text-slate-400" />
                              <span>
                                {capacity
                                  ? capacity?.minCapacity
                                  : "sin configurar"}
                              </span>
                            </Badge>
                          </div>
                        </div>
                        <div>
                          <p
                            className="mt-4 text-xs font-semibold"
                            aria-hidden="true"
                          >
                            Máximo
                          </p>
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="outline" className="flex gap-2">
                              <UsersRound className="size-4 text-slate-400" />
                              <span>
                                {capacity
                                  ? capacity?.maxCapacity
                                  : "sin configurar"}
                              </span>
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              disabled={!capacity}
                              aria-label="Open menu"
                              variant="ghost"
                              className="flex size-8 p-0 data-[state=open]:bg-muted"
                            >
                              <Ellipsis className="size-4" aria-hidden="true" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-40">
                            <DropdownMenuItem
                              onSelect={() => handleEdit(capacity)}
                            >
                              Editar
                              <DropdownMenuShortcut>
                                <Edit className="size-4" aria-hidden="true" />
                              </DropdownMenuShortcut>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onSelect={() => handleDelete(capacity)}
                            >
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
                </div>
              </div>
            );
          })
        ) : (
          <Badge className="font-medium text-slate-400" variant="outline">
            <Info className="mr-2 size-3" aria-hidden="true" />
            No hay capacidades configurados
          </Badge>
        )}
      </div>
      {selectedCapacity && (
        <EditCapacitySheet
          capacityData={selectedCapacity}
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          refetchClassCapacities={refetchClassCapacities}
        />
      )}
      {capacityToDelete && (
        <DeleteCapacityDialog
          capacity={capacityToDelete}
          open={showDeleteDialog}
          onOpenChange={setShowDeleteDialog}
          onSuccess={refetchClassCapacities}
        />
      )}
    </div>
  );
}
