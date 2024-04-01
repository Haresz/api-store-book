import { Router } from "express";
import {
  addBookController,
  getAllBookController,
} from "../controller/book.controller";

const bookRouter = Router();

bookRouter.get("/", getAllBookController);
bookRouter.post("/", addBookController);

export default bookRouter;
