import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const repoFindOrders = async (id_user: any) => {
  console.log(id_user);
  return await prisma.orders.findUnique({
    where: { id_user: parseInt(id_user) },
  });
};

export const repoAddOrders = async (id_user: number) => {
  await prisma.orders.create({ data: { id_user: id_user, total_point: 0 } });
};

export const repoFindAllOrderItems = async (id_user: any) => {
  return await prisma.orders.findMany({
    include: { order_item: true },
    where: { id_user: parseInt(id_user) },
  });
};

export const repoAddOrderItem = async (
  id_order: number,
  id_book: number,
  quantity: number,
  unit_point: number
) => {
  console.log(id_order, "repo");
  await prisma.orderItem.create({
    data: {
      id_order: id_order,
      id_book: id_book,
      quantity: quantity,
      unit_point: unit_point,
      id_transaction: null,
    },
  });
};

export const repoAddIdTransactionOrderItem = async (
  id_order_item: any,
  id_transaction: any
) => {
  console.log(id_order_item);
  await prisma.orderItem.update({
    where: { id_order_item: parseInt(id_order_item) },
    data: { id_transaction: parseInt(id_transaction) },
  });
};

export const repoGetDetailOrderItem = async (
  id_order: any,
  id_order_item: number
) => {
  return await prisma.orderItem.findUnique({
    where: {
      id_order_item: parseInt(id_order_item as unknown as string),
      id_order: parseInt(id_order as unknown as string),
    },
    include: { book: true },
  });
};

export const repoFindBookInOrderItem = async (id_book: any) => {
  return await prisma.orderItem.findUnique({
    where: { id_book: id_book },
  });
};

export const repoUpdateQty = async (
  id_book: any,
  qty: any,
  unit_point: any
) => {
  return await prisma.orderItem.update({
    where: { id_book: id_book },
    data: { quantity: +qty, unit_point: +unit_point },
  });
};

export const repoDeleteOrderItem = async (id_order_item: string) => {
  return await prisma.orderItem.delete({
    where: {
      id_order_item: parseInt(id_order_item),
    },
  });
};
