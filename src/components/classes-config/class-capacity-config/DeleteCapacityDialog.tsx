import { useClassCapacity } from "@/hooks/use-class-capacity";
import { useMediaQuery } from "@/hooks/use-media-query";
import { ClassCapacityData, typeClassColors, typeClassLabels } from "@/types";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

import { cn } from "@/lib/utils";

interface DeleteCapacityDialogProps {
  capacity: ClassCapacityData;
  onSuccess?: () => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
export function DeleteCapacityDialog({
  capacity,
  onSuccess,
  open,
  onOpenChange,
}: DeleteCapacityDialogProps) {
  const isDesktop = useMediaQuery("(min-width: 640px)");

  const { deleteClassCapacity } = useClassCapacity();

  const handleDelete = async () => {
    deleteClassCapacity(capacity.id);
    onSuccess?.();
  };

  if (isDesktop) {
    return (
      <AlertDialog open={open} onOpenChange={onOpenChange}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás absolutamente seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción eliminará la capacidad{" "}
              <span className="font-bold">mínimo {capacity.minCapacity}</span> y{" "}
              <span className="font-bold">máxima {capacity.maxCapacity}</span>{" "}
              la clase de tipo{" "}
              <span
                className={cn("font-bold", typeClassColors[capacity.typeClass])}
              >
                {typeClassLabels[capacity.typeClass]}
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2 sm:space-x-0">
            <AlertDialogCancel asChild>
              <Button variant="outline">Cancelar</Button>
            </AlertDialogCancel>
            <AlertDialogAction
              aria-label="Eliminar capacidad de la clase"
              onClick={handleDelete}
              disabled={false}
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>¿Estás absolutamente seguro?</DrawerTitle>
          <DrawerDescription>
            Esta acción eliminará la capacidad{" "}
            <span className="font-bold">mínimo {capacity.minCapacity}</span> y{" "}
            <span className="font-bold">máxima {capacity.maxCapacity}</span> de
            la clase de tipo{" "}
            <span
              className={cn("font-bold", typeClassColors[capacity.typeClass])}
            >
              {typeClassLabels[capacity.typeClass]}
            </span>
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className="gap-2 sm:space-x-0">
          <Button
            aria-label="Eliminar capacidad de la clase"
            onClick={onSuccess}
            disabled={false}
          >
            Eliminar
          </Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
