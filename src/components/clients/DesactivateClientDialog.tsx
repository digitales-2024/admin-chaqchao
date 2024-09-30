import { useClients } from "@/hooks/use-clients"; // Adaptar a tu hook para clientes
import { Client } from "@/types"; // Asegúrate de tener el tipo Client definido

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

interface DesactivateClientDialogProps {
  client: Client; // Asegúrate de que el tipo Client tenga la estructura necesaria
  onSuccess?: () => void;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const DesactivateClientDialog = ({
  client,
  onSuccess,
  isOpen,
  onOpenChange,
}: DesactivateClientDialogProps) => {
  const { onDeactivateClient } = useClients(); // Hook para desactivar clientes

  const handleDesactivate = async () => {
    await onDeactivateClient(client.id); // Desactivar cliente
    onSuccess?.(); // Llamar a onSuccess si está definido
    onOpenChange(false); // Cierra el diálogo después de la acción
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estás absolutamente seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            {`Esta acción eliminará el cliente "${client.name}".`}{" "}
            {/* Asegúrate de que 'name' sea una propiedad válida en el tipo Client */}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleDesactivate}>
            Eliminar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
