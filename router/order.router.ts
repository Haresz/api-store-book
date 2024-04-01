import { Router } from "express";
import {
  addOrderItem,
  deleteOrderItem,
  getAllOrderItems,
  getDetailOrderItems,
} from "../controller/order.controller";

const orderRouter = Router();

orderRouter.post("/", addOrderItem);
orderRouter.get("/:id", getAllOrderItems);
orderRouter.get("/:idorder/:id", getDetailOrderItems);

orderRouter.delete("/:id", deleteOrderItem);

export default orderRouter;
