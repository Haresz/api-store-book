import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const repoFindUser = async (email: any) => {
  return await prisma.users.findUnique({
    where: { email },
  });
};

export const repoFindUserById = async (id_user: any) => {
  return await prisma.users.findUnique({
    where: { id_user },
  });
};

export const repoAddPoint = async (id_user: any) => {
  return await prisma.point.create({
    data: { point: 100, id_user },
  });
};

export const repoGetPoint = async (id_user: number | any) => {
  return await prisma.point.findUnique({
    where: { id_user },
  });
};

export const repoAddUser = async (
  username: any,
  email: any,
  password: any,
  address: any
) => {
  await prisma.users.create({
    data: {
      username,
      email,
      password,
      address,
      id_point: null,
    },
  });
};

export const repoUserUpdatePoint = async (id_point: any, id_user: any) => {
  await prisma.users.update({
    data: { id_point },
    where: { id_user },
  });
};
