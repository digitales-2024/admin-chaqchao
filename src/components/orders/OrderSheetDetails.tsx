import { Izipay } from "@/assets/icons";
import { useOrders } from "@/hooks/use-orders";
import { Order, OrderStatus } from "@/types";
import { BillingDocumentType } from "@/types/orders";
import { numberToLetter } from "@/utils/numberToLetter";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
  PackageOpen,
  Copy,
  Mail,
  MessageCircleMore,
  MoreVertical,
  PackageCheck,
  PackageX,
  Phone,
  Truck,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { cn } from "@/lib/utils";

import { Line } from "../common/Line";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "../ui/sheet";

export const statusColors: Record<Order["orderStatus"], string> = {
  CONFIRMED: "border-blue-300 text-blue-300",
  PROCESSING: "border-cyan-500 text-cyan-500",
  COMPLETED: "border-green-500 text-green-500",
  CANCELLED: "border-rose-500 text-rose-500",
};

export const iconsStatus: Record<Order["orderStatus"], React.ReactElement> = {
  CONFIRMED: <PackageOpen size={15} />,
  PROCESSING: <PackageCheck size={15} />,
  COMPLETED: <Truck size={15} />,
  CANCELLED: <PackageX size={15} />,
};
export const translateStatus: Record<Order["orderStatus"], string> = {
  CONFIRMED: "Confirmado",
  PROCESSING: "Procesando",
  COMPLETED: "Completado",
  CANCELLED: "Cancelado",
};
interface OrderSheetDetailsProps {
  order: Order | null;
  open: boolean;
  onOpenChange: () => void;
}

export const OrderSheetDetails = ({
  order,
  open,
  onOpenChange,
}: OrderSheetDetailsProps) => {
  const { orderById } = useOrders({
    id: order?.id,
  });

  const [isCopy, setIsCopy] = useState<boolean>(false);
  const handleCopyOrderID = () => {
    setIsCopy(true);
    navigator.clipboard.writeText(orderById?.pickupCode as string);
    setTimeout(() => {
      setIsCopy(false);
    }, 2000);
  };

  const { onOrderStatusUpdate, onDownloadPdf } = useOrders();

  const pickupDate = new Date(
    orderById?.pickupTime?.toString().replace("Z", "") ?? new Date(),
  );
  const hour = pickupDate.getHours();
  const minute = pickupDate.getMinutes().toString().padStart(2, "0");
  const hour12 = hour % 12 || 12;
  const ampm = hour >= 12 ? "PM" : "AM";

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="m-2 flex h-full min-h-screen flex-col gap-5 rounded-xl border-none sm:max-w-[36rem]">
        <SheetDescription asChild>
          <ScrollArea className="h-fit">
            <SheetTitle className="flex flex-col items-start gap-2 px-2 py-4">
              <div className="ml-auto flex items-center gap-1">
                <Badge
                  variant="outline"
                  className={`${statusColors[orderById?.orderStatus as keyof typeof statusColors]} flex gap-2 font-light`}
                >
                  {
                    iconsStatus[
                      orderById?.orderStatus as keyof typeof iconsStatus
                    ]
                  }
                  {
                    translateStatus[
                      orderById?.orderStatus as keyof typeof translateStatus
                    ]
                  }
                </Badge>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="icon" variant="outline" className="h-8 w-8">
                      <MoreVertical className="h-3.5 w-3.5" />
                      <span className="sr-only">Mas</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onSelect={() =>
                        order?.id && onDownloadPdf(order.id, order.pickupCode)
                      }
                    >
                      Exportar
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="hover:cursor-pointer hover:text-rose-500"
                      onSelect={() =>
                        onOrderStatusUpdate(
                          orderById?.id as string,
                          OrderStatus.CANCELLED,
                        )
                      }
                    >
                      Cancelar
                      <DropdownMenuShortcut>
                        <PackageX className="size-4" aria-hidden="true" />
                      </DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <Line className="border-dashed" />
              <div className="flex w-full flex-col items-center justify-center gap-1">
                <div>
                  {orderById?.billingDocument.billingDocumentType ===
                  ("INVOICE" as unknown as BillingDocumentType)
                    ? "Factura"
                    : "Boleta"}{" "}
                </div>
                <div className="group relative flex w-fit items-center gap-2 text-lg">
                  <span className="font-thin uppercase text-slate-500">
                    Pedido #{" "}
                  </span>
                  <span className="truncate">{orderById?.pickupCode}</span>
                  <span
                    className={cn(
                      "absolute -top-3 right-0 rotate-12 truncate text-xs font-thin text-slate-400 transition-all duration-300",
                      {
                        "scale-0 opacity-0": !isCopy,
                        "scale-105 opacity-100": isCopy,
                      },
                    )}
                  >
                    copiado
                  </span>
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                    onClick={handleCopyOrderID}
                  >
                    <Copy className="h-3 w-3" />
                    <span className="sr-only">Copy Order ID</span>
                  </Button>
                </div>
              </div>
              <Line className="border-dashed" />
              <div className="grid w-full gap-3 text-sm">
                <div className="font-semibold">Información del cliente</div>
                <dl className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col items-start">
                    <dt className="text-xs font-thin text-gray-500">Cliente</dt>
                    <dd className="font-normal capitalize">
                      {orderById?.client.name} {orderById?.client.lastName}{" "}
                    </dd>
                  </div>
                  <div className="flex flex-col flex-wrap items-start">
                    <dt className="text-xs font-thin text-gray-500">
                      Correo electrónico
                    </dt>
                    <dd className="group/email font-normal">
                      {orderById?.client.email}
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-6 w-6 opacity-0 transition-opacity group-hover/email:opacity-100"
                      >
                        <span className="sr-only">Email client</span>
                        <a href={`mailto: ${orderById?.client.email}`}>
                          <Mail className="h-3 w-3" />
                        </a>
                      </Button>
                    </dd>
                  </div>
                  <div className="flex flex-col items-start">
                    <dt className="text-xs font-thin text-gray-500">
                      Teléfono
                    </dt>
                    <dd className="group/phone space-x-2 font-normal">
                      {orderById?.client.phone}
                      {orderById?.client.phone && (
                        <>
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-6 w-6 opacity-0 transition-opacity group-hover/phone:opacity-100"
                          >
                            <span className="sr-only">Phone client</span>
                            <a href={`tel:${orderById?.client.phone}`}>
                              <Phone className="h-3 w-3" />
                            </a>
                          </Button>
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-6 w-6 opacity-0 transition-opacity group-hover/phone:opacity-100"
                          >
                            <span className="sr-only">Phone client</span>
                            <a
                              href={`https://wa.me/${orderById?.client.phone.replace(/\s+/g, "")}`}
                              target="_blank"
                            >
                              <MessageCircleMore className="h-3 w-3" />
                            </a>
                          </Button>
                        </>
                      )}
                    </dd>
                  </div>
                  <div></div>
                  <div className="flex flex-col items-start">
                    <dt className="text-xs font-thin text-gray-500">
                      Tipo documento
                    </dt>
                    <dd className="font-normal capitalize">
                      {orderById?.billingDocument.typeDocument}
                    </dd>
                  </div>
                  <div className="flex flex-col items-start">
                    <dt className="text-xs font-thin text-gray-500">
                      N° documento
                    </dt>
                    <dd className="font-normal capitalize">
                      {orderById?.billingDocument.documentNumber}
                    </dd>
                  </div>
                  <div className="flex flex-col items-start">
                    <dt className="text-xs font-thin text-gray-500">
                      Dirección
                    </dt>
                    <dd className="font-normal capitalize">
                      {orderById?.billingDocument.address ?? "--"}
                    </dd>
                  </div>
                  <div className="flex flex-col items-start">
                    <dt className="text-xs font-thin text-gray-500">País</dt>
                    <dd className="font-normal capitalize">
                      {orderById?.billingDocument.country ?? "--"}
                    </dd>
                  </div>
                  <div className="flex flex-col items-start">
                    <dt className="text-xs font-thin text-gray-500">Estado</dt>
                    <dd className="font-normal capitalize">
                      {orderById?.billingDocument.state ?? "--"}
                    </dd>
                  </div>
                  <div className="flex flex-col items-start">
                    <dt className="text-xs font-thin text-gray-500">Ciudad</dt>
                    <dd className="font-normal capitalize">
                      {orderById?.billingDocument.city ?? "--"}
                    </dd>
                  </div>
                  {orderById?.billingDocument.businessName !== "" && (
                    <div className="flex flex-col items-start">
                      <dt className="text-xs font-thin text-gray-500">
                        Empresa
                      </dt>
                      <dd className="font-normal capitalize">
                        {orderById?.billingDocument.businessName}
                      </dd>
                    </div>
                  )}
                </dl>
              </div>
              <Line className="border-dashed" />
              <div className="w-full text-center text-xs font-thin">
                {`${format(pickupDate, "EEEE, dd MMMM", { locale: es })}, ${hour12}:${minute} ${ampm}`}
              </div>
              <Line className="border-dashed" />
            </SheetTitle>
            <div className="flex-1 px-0 py-2 sm:px-6">
              <div className="space-y-4">
                <div className="text-sm font-semibold">Detalles del pedido</div>
                <Table>
                  <TableCaption className="text-xs text-gray-300">
                    Productos
                  </TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="max-w-40">Artículo</TableHead>
                      <TableHead>Cant.</TableHead>
                      <TableHead>P.U</TableHead>
                      <TableHead className="text-right">Importe</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orderById?.cart.products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="flex items-center gap-2 truncate">
                          <Avatar className="rounded-md bg-slate-100">
                            {product.images && product.images.length > 0 ? (
                              <AvatarImage
                                src={product.images[0].url}
                                alt={product.name}
                              />
                            ) : (
                              <AvatarFallback>
                                <PackageOpen />
                              </AvatarFallback>
                            )}
                          </Avatar>
                          <span className="text-muted-foreground">
                            {product.name}
                          </span>
                        </TableCell>
                        <TableCell>{product.quantity}</TableCell>
                        <TableCell>{product.price.toFixed(2)}</TableCell>
                        <TableCell className="text-right">
                          {(product.price * product.quantity).toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <ul className="grid gap-3">
                  <li className="flex items-center justify-between font-semibold">
                    <span className="font-thin">Total venta</span>
                    <span>S/. {(order?.totalAmount ?? 0).toFixed(2)}</span>
                  </li>
                </ul>
              </div>
              <div className="mt-10 flex flex-col gap-2">
                <p className="text-center text-xs">
                  Son{" "}
                  {numberToLetter(Number((order?.totalAmount ?? 0).toFixed(2)))}{" "}
                </p>
                <div className="grid grid-cols-3 items-center gap-3">
                  <Line className="w-full border-dashed" />
                  <span className="text-center text-xs">Forma de Pago</span>
                  <Line className="border-dashed" />
                </div>
                <li className="flex items-center justify-between font-semibold">
                  <span className="font-thin">
                    <Izipay className="h-4" />
                  </span>
                  <span>S/. {(order?.totalAmount ?? 0).toFixed(2)}</span>
                </li>
              </div>
              <ScrollBar orientation="horizontal" />
            </div>
          </ScrollArea>
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};
