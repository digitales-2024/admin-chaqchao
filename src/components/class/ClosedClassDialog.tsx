"use client";
import { useClasses } from "@/hooks/use-class";
import { ClassesDataAdmin } from "@/types";

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
  class: ClassesDataAdmin;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ClosedClassDialog = (props: ClosedClassDialogProps) => {
  const { closeClass } = useClasses();

  return (
    <AlertDialog {...props}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            ¿Estás seguro de {props.class.isClosed ? "Abrir" : "Cerrar"} la
            clase?
          </AlertDialogTitle>
          <AlertDialogDescription>
            {props.class.isClosed
              ? "Al abrir la clase, los usuarios podrán registrarse."
              : "Al cerrar la clase, los usuarios no podrán registrarse."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => props.class.id && closeClass(props.class.id)}
          >
            {props.class.isClosed ? "Abrir" : "Cerrar"} clase
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
