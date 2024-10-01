import { useClients } from "@/hooks/use-clients"; // Hook para clientes
import { useMediaQuery } from "@/hooks/use-media-query"; // Hook para detectar pantallas grandes
import { Client } from "@/types"; // Define la interfaz o tipo para Client
import { Row } from "@tanstack/react-table"; // Para manipular las filas de la tabla
import { RefreshCcw } from "lucide-react"; // Icono de carga
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
} from "../ui/alert-dialog"; // Importación de componentes UI de diálogos de alerta
import { Button } from "../ui/button"; // Botón personalizado
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "../ui/drawer"; // Importación de componentes UI de cajón (drawer)

interface ReactivateClientDialogProps
  extends ComponentPropsWithoutRef<typeof AlertDialog> {
  client: Row<Client>["original"]; // Información del cliente seleccionada
  showTrigger?: boolean;
  onSuccess?: () => void;
}

export const ReactivateClientDialog = ({
  client,
  onSuccess,
  ...props
}: ReactivateClientDialogProps) => {
  const isDesktop = useMediaQuery("(min-width: 640px)"); // Verifica si es escritorio

  const { onReactivateClient, isLoadingReactivateClient } = useClients(); // Hook para reactivar cliente

  const onReactivateClientHandler = () => {
    onReactivateClient(client.id); // Llama a la función para reactivar cliente
    props.onOpenChange?.(false); // Cierra el diálogo o cajón
    onSuccess?.(); // Ejecuta la función de éxito si está definida
  };

  if (isDesktop) {
    return (
      <AlertDialog {...props}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás absolutamente seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              {`Esta acción reactivará al cliente "${client.name}".`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2 sm:space-x-0">
            <AlertDialogCancel asChild>
              <Button variant="outline">Cancelar</Button>
            </AlertDialogCancel>
            <AlertDialogAction
              aria-label="Reactivate selected rows"
              onClick={onReactivateClientHandler}
              disabled={isLoadingReactivateClient}
            >
              {isLoadingReactivateClient && (
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
            {`Esta acción desactivará al cliente "${client.name}".`}
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className="gap-2 sm:space-x-0">
          <Button
            aria-label="Reactivate selected rows"
            onClick={onReactivateClientHandler}
            disabled={isLoadingReactivateClient}
          >
            {isLoadingReactivateClient && (
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
