"use client";
import { useClasses } from "@/hooks/use-class";

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

interface ClosedClassDialogProps {
  id: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ClosedClassDialog = (props: ClosedClassDialogProps) => {
  const { closeClass } = useClasses();

  return (
    <AlertDialog {...props}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estás seguro de cerrar la clase?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no podrá deshacerse. Si deseas cerrar la clase, hazlo.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={() => closeClass(props.id)}>
            Cerrar clase
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
