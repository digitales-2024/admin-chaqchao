import { useDeleteClassLanguage } from "@/hooks/use-class-language";
import { useMediaQuery } from "@/hooks/use-media-query";
import { ClassLanguageData } from "@/types";
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

interface DeleteLanguagueDialogProps {
  language: ClassLanguageData;
  onSuccess?: () => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeleteLanguageDialog({
  language,
  onSuccess,
  open,
  onOpenChange,
}: DeleteLanguagueDialogProps) {
  const [isDeletePending, startTransition] = useTransition();
  const isDesktop = useMediaQuery("(min-width: 640px)");

  const { onDeleteClassLanguage } = useDeleteClassLanguage();

  const onDeleteLanguageHandler = () => {
    startTransition(async () => {
      await onDeleteClassLanguage(language.id);
      onSuccess?.();
      onOpenChange(false);
    });
  };

  if (isDesktop) {
    return (
      <AlertDialog open={open} onOpenChange={onOpenChange}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás absolutamente seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción eliminará el lenguaje{" "}
              <span className="font-medium">{language.languageName}</span> de la
              clase.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2 sm:space-x-0">
            <AlertDialogCancel asChild>
              <Button variant="outline">Cancelar</Button>
            </AlertDialogCancel>
            <AlertDialogAction
              aria-label="Eliminar precio de clase"
              onClick={onDeleteLanguageHandler}
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
            Esta acción eliminará el lenguaje{" "}
            <span className="font-medium">{language.languageName}</span> de la
            clase.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className="gap-2 sm:space-x-0">
          <Button
            aria-label="Eliminar precio de clase"
            onClick={onDeleteLanguageHandler}
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