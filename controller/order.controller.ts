import { Request, Response } from "express";
import {
  serviceAddOrderItem,
  serviceDeleteOrderItem,
  serviceGetAllOrderItems,
  serviceGetDatailOrderItems,
} from "../service/order.service";

export const addOrderItem = async (req: Request, res: Response) => {
  const result = await serviceAddOrderItem(req.body);
  return res.status(Number(result.status)).send(result);
};

export const getAllOrderItems = async (req: Request, res: Response) => {
  console.log(req.params.id);
  const result: any = await serviceGetAllOrderItems(req.params.id);
  return res.status(result.status).send(result);
};

export const getDetailOrderItems = async (req: Request, res: Response) => {
  const result = await serviceGetDatailOrderItems(
    req.params.idorder,
    req.params.id
  );
  return res.status(Number(result.status)).send(result);
};

export const deleteOrderItem = async (req: Request, res: Response) => {
  console.log(req.params.id);
  const result = await serviceDeleteOrderItem(req.params.id);
  return res.status(Number(result.status)).send(result);
};
