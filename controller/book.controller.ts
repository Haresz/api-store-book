import { Request, Response } from "express";
import { serviceAddBook, serviceGetALLBooks } from "../service/book.service";

export const addBookController = async (req: Request, res: Response) => {
  const result = await serviceAddBook(req.body);
  return res.status(201).send(result);
};

export const getAllBookController = async (req: Request, res: Response) => {
  const result = await serviceGetALLBooks();
  return res.status(200).send(result);
};
