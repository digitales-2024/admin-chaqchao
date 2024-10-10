import { useMediaQuery } from "@/hooks/use-media-query";
import { useOrders } from "@/hooks/use-orders";
import { Client } from "@/types";

import { ErrorPage } from "../common/ErrorPage";
import { DataTableSkeleton } from "../data-table/DataTableSkeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "../ui/drawer";
import { OrdersTable } from "./ClientOrdersHistoryTable";

interface ClientOrderHistoryDialogProps {
  client: Client;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ClientOrderHistoryDialog = ({
  client,
  isOpen,
  onOpenChange,
}: ClientOrderHistoryDialogProps) => {
  const isDesktop = useMediaQuery("(min-width: 640px)");

  const { dataOrdersClient, isLoadingOrdersClient } = useOrders({
    id: client.id,
  });
  let content = null;

  if (isLoadingOrdersClient) {
    content = <DataTableSkeleton columnCount={4} />;
  }

  if (!dataOrdersClient) {
    content = <ErrorPage />;
  }

  if (dataOrdersClient) {
    content = <OrdersTable data={dataOrdersClient} />;
  }

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent
          style={{
            width: "95%",
            maxWidth: "1200px",
            padding: "2rem",
          }}
        >
          <DialogHeader>
            <DialogTitle>Historial de pedidos de {client.name}</DialogTitle>
            <DialogDescription>
              Aquí puedes ver todos los pedidos realizados por este cliente.
            </DialogDescription>
          </DialogHeader>
          {content}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent className="max-w-full px-4 py-4">
        <DrawerHeader>
          <DrawerTitle>Historial de pedidos de {client.name}</DrawerTitle>
          <DrawerDescription>
            Aquí puedes ver todos los pedidos realizados por este cliente.
          </DrawerDescription>
        </DrawerHeader>
        {content}
        <DrawerFooter>
          <DrawerClose asChild>
            <button className="btn btn-outline">Cerrar</button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
