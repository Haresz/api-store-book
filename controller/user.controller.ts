import { Response, Request, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import {
  serviceRegister,
  serviceLogin,
  serviceVerifyToken,
} from "../service/user.services";

const prisma = new PrismaClient();

export const register = async (req: Request, res: Response) => {
  const result = await serviceRegister(req.body);
  return res.status(Number(result?.status)).send(result);
};

export const login = async (req: Request, res: Response) => {
  const result = await serviceLogin(req.body);
  return res.status(Number(result?.status)).send(result);
};

export const verifyToken = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  const result = await serviceVerifyToken(req, next);
  return res.status(Number(result?.status)).send(result);
};

interface User {
  username: string;
  email: string;
  password: string;
  address: string;
}
