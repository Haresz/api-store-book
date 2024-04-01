import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const repoFindPoint = async (id_user: any) => {
  return await prisma.point.findUnique({
    where: { id_user: parseInt(id_user) },
  });
};
