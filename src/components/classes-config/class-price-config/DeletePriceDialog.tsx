import { useClassPrices } from "@/hooks/use-class-price";
import { useMediaQuery } from "@/hooks/use-media-query";
import { ClassPriceConfigData } from "@/types";
import { RefreshCcw } from "lucide-react";
import { useTransition } from "react";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";

interface DeletePriceDialogProps {
  price: ClassPriceConfigData;
  onSuccess?: () => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeletePriceDialog({
  price,
  onSuccess,
  open,
  onOpenChange,
}: DeletePriceDialogProps) {
  const [isDeletePending, startTransition] = useTransition();
  const isDesktop = useMediaQuery("(min-width: 640px)");

  const { onDeleteClassPrice } = useClassPrices();

  const onDeletePriceHandler = () => {
    startTransition(async () => {
      await onDeleteClassPrice(price.id);
      onSuccess?.();
      onOpenChange(false);
    });
  };

  const priceType = price.classTypeUser === "ADULT" ? "Adulto" : "Niño";

  if (isDesktop) {
    return (
      <AlertDialog open={open} onOpenChange={onOpenChange}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás absolutamente seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción eliminará el precio de la clase para{" "}
              <span className="font-medium">{priceType}</span>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2 sm:space-x-0">
            <AlertDialogCancel asChild>
              <Button variant="outline">Cancelar</Button>
            </AlertDialogCancel>
            <AlertDialogAction
              aria-label="Eliminar precio de clase"
              onClick={onDeletePriceHandler}
              disabled={isDeletePending}
            >
              {isDeletePending && (
                <RefreshCcw
                  className="mr-2 h-4 w-4 animate-spin"
                  aria-hidden="true"
                />
              )}
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  // For mobile devices, use Drawer
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>¿Estás absolutamente seguro?</DrawerTitle>
          <DrawerDescription>
            Esta acción eliminará el precio de la clase para{" "}
            <span className="font-medium">{priceType}</span>.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className="gap-2 sm:space-x-0">
          <Button
            aria-label="Eliminar precio de clase"
            onClick={onDeletePriceHandler}
            disabled={isDeletePending}
          >
            {isDeletePending && (
              <RefreshCcw
                className="mr-2 h-4 w-4 animate-spin"
                aria-hidden="true"
              />
            )}
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
