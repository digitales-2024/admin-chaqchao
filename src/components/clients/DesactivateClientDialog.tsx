import { useClients } from "@/hooks/use-clients";
import { Client } from "@/types";

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
  client: Client;
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
  const { onDeactivateClient } = useClients();

  const handleDesactivate = async () => {
    await onDeactivateClient(client.id);
    onSuccess?.();
    onOpenChange(false);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estás absolutamente seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            {`Esta acción eliminará el cliente "${client.name}".`}{" "}
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
