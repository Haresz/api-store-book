import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const repoTransaction = async (id_point: any, total_point: any) => {
  console.log(id_point, total_point);
  return prisma.transaction.create({
    data: {
      id_point,
      total_point,
    },
  });
};

export const repoGetAllTransactions = async () => {
  return await prisma.transaction.findMany();
};

export const repoGetDetailTransaction = async (id_transaction: any) => {
  await prisma.transaction.findUnique({
    where: { id_transaction },
  });
};
