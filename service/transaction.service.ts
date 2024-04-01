import { repoDecStockBook } from "../repository/book.repository";
import {
  repoAddIdTransactionOrderItem,
  repoFindOrders,
  repoGetDetailOrderItem,
} from "../repository/order.repository";
import { repoFindPoint } from "../repository/point.repository";
import {
  repoGetAllTransactions,
  repoTransaction,
  repoGetDetailTransaction,
} from "../repository/transaction.repository";

export const getAllTransaction = async () => {
  try {
    const data = await repoGetAllTransactions();
    return {
      status: 200,
      success: true,
      message: "get transaction successfully",
      data: data,
    };
  } catch (error) {
    console.log(error);
    return {
      status: 200,
      success: true,
      message: "get transaction successfully",
    };
  }
};

export const servicesTransactions = async (params: any, body: any) => {
  try {
    const findPoint = await repoFindPoint(params.id_user);
    const findOrders = await repoFindOrders(params.id_user);

    if (!findPoint || !findOrders) {
      return {
        status: 401,
        success: false,
        message: "invalid user",
      };
    }

    const orderItemIds = await Promise.all(
      body.order_item.map(async (item: number) => {
        const getOrderItem = await repoGetDetailOrderItem(
          findOrders.id_order,
          item
        );
        if (!getOrderItem) {
          return {
            status: 401,
            success: false,
            message: "invalid id_order_item",
          };
        }
        await repoDecStockBook(
          getOrderItem.book.id_book,
          getOrderItem.book.stock_quantity - getOrderItem.quantity
        );

        return {
          unit_point: getOrderItem.unit_point,
        };
      })
    );

    const totalPoint = orderItemIds.reduce(
      (acc, curr) => acc + curr.unit_point,
      0
    );

    const addTransaction = await repoTransaction(
      findPoint.id_point,
      totalPoint
    );

    body.order_item.map(async (item: any) => {
      const update = await repoAddIdTransactionOrderItem(
        item,
        addTransaction.id_point
      );
      console.log(update);
    });

    return {
      status: 201,
      success: true,
      message: "transaction added successfully",
      totalPoint,
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      success: false,
      message: "server error",
    };
  }
};
