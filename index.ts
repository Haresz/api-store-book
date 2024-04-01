import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import bookRouter from "./router/book.router";
import userRouter from "./router/user.router";
import orderRouter from "./router/order.router";
import transactionRouter from "./router/transaction.router";

const app = express();
const PORT = 3030;

app.get("/", (req: Request, res: Response) => {
  res.status(200).send({
    message: "success",
    data: [],
  });
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/order", orderRouter);
app.use("/api/books", bookRouter);
app.use("/api", userRouter);
app.use("/api/transactions", transactionRouter);

app.listen(PORT, () => {
  console.log("PORT listening on port : " + PORT);
});
