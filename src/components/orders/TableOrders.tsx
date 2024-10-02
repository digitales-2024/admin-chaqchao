"use client";
import { useGetOrderByIdQuery } from "@/redux/services/ordersApi";
import { Order } from "@/types";
import Image from "next/image";
import { useMemo } from "react";

import { DataTableExpanded } from "../data-table/DataTableExpanded";
import { DataTableSkeleton } from "../data-table/DataTableSkeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { getColumnsOrders } from "./OrdersTableColumns";

export const TableOrders = ({ data }: { data: Order[] }) => {
  const columns = useMemo(() => getColumnsOrders(), []);

  return (
    <DataTableExpanded
      columns={columns}
      data={data}
      placeholder="Buscar pedidos..."
      getSubRows={(row) => row.comments as unknown as []}
      renderExpandedRow={(row) => <ProductsExpanded data={row} />}
    />
  );
};

const ProductsExpanded = ({ data }: { data: Order }) => {
  const { data: dataOrderById, isLoading: isLoadingOrderById } =
    useGetOrderByIdQuery(data.id);
  if (isLoadingOrderById) {
    return (
      <DataTableSkeleton
        columnCount={5}
        rowCount={3}
        searchableColumnCount={0}
        showViewOptions={false}
        withPagination={false}
        toolbarActions={false}
        filterableColumnCount={0}
      />
    );
  }
  return (
    <div>
      <Table>
        <TableCaption>Productos</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead>Producto</TableHead>
            <TableHead>Cantidad</TableHead>
            <TableHead>Precio</TableHead>
            <TableHead>Subtotal</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dataOrderById?.cart.map((product, index) => (
            <TableRow key={index}>
              <TableCell>
                <Image
                  src={product.image}
                  alt={product.name}
                  width={50}
                  height={50}
                />
              </TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.quantity}</TableCell>
              <TableCell>S/. {product.price}</TableCell>
              <TableCell>S/. {product.price * product.quantity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>Total</TableCell>
            <TableCell className="text-start font-bold">
              S/.{" "}
              {dataOrderById?.cart.reduce(
                (acc, product) => acc + product.price * product.quantity,
                0,
              )}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};
