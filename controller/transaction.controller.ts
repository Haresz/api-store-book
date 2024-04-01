import { Request, Response } from "express";
import {
  getAllTransaction,
  servicesTransactions,
} from "../service/transaction.service";

export const transactionController = async (req: Request, res: Response) => {
  const result: any = await servicesTransactions(req.params, req.body);
  return res.status(Number(result.status)).send(result);
};

export const getAllTransactions = async (req: Request, res: Response) => {
  const result: any = await getAllTransaction();
  return res.status(Number(result.status)).send(result);
};
