import { useCategories } from "@/hooks/use-categories";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Category } from "@/types";
import { Row } from "@tanstack/react-table";
import { RefreshCcw } from "lucide-react";
import { ComponentPropsWithoutRef } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "../ui/drawer";

interface ReactivateCategoryDialogProps
  extends ComponentPropsWithoutRef<typeof AlertDialog> {
  category: Row<Category>["original"];
  showTrigger?: boolean;
  onSuccess?: () => void;
}

export const ReactivateCategoryDialog = ({
  category,
  onSuccess,
  ...props
}: ReactivateCategoryDialogProps) => {
  const isDesktop = useMediaQuery("(min-width: 640px)");

  const { onReactivateCategory, isLoadingReactivateCategory } = useCategories();

  const onReactivateCategoryHandler = () => {
    onReactivateCategory(category.id);
    props.onOpenChange?.(false);
    onSuccess?.();
  };

  if (isDesktop) {
    return (
      <AlertDialog {...props}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás absolutamente seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              {`Esta acción desactivará la categoría "${category.name}".`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2 sm:space-x-0">
            <AlertDialogCancel asChild>
              <Button variant="outline">Cancelar</Button>
            </AlertDialogCancel>
            <AlertDialogAction
              aria-label="Reactivate selected rows"
              onClick={onReactivateCategoryHandler}
              disabled={isLoadingReactivateCategory}
            >
              {isLoadingReactivateCategory && (
                <RefreshCcw
                  className="mr-2 size-4 animate-spin"
                  aria-hidden="true"
                />
              )}
              Reactivar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }
  return (
    <Drawer {...props}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>¿Estás absolutamente seguro?</DrawerTitle>
          <DrawerDescription>
            {`Esta acción desactivará la categoría "${category.name}".`}
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className="gap-2 sm:space-x-0">
          <Button
            aria-label="Reactivate selected rows"
            onClick={onReactivateCategoryHandler}
            disabled={isLoadingReactivateCategory}
          >
            {isLoadingReactivateCategory && (
              <RefreshCcw
                className="mr-2 size-4 animate-spin"
                aria-hidden="true"
              />
            )}
            Reactivar
          </Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
