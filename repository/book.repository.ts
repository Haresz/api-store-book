import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const repoAddBook = async (req: any) => {
  await prisma.books.create({
    data: req,
  });
};

export const repoGetDetailBook = async (id: any) => {
  return await prisma.books.findUnique({
    where: { id_book: id },
  });
};

export const repoGetAllBooks = async () => {
  const data = await prisma.books.findMany();
  console.log(data, "repo");
  return data;
};

export const repoDecStockBook = async (id_book: any, stock: any) => {
  return await prisma.books.update({
    data: { stock_quantity: stock },
    where: { id_book },
  });
};
