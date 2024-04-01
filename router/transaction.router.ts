import { Router } from "express";
import {
  getAllTransactions,
  transactionController,
} from "../controller/transaction.controller";

const transactionRouter = Router();

transactionRouter.get("/", getAllTransactions);
transactionRouter.post("/:id_user", transactionController);

export default transactionRouter;
