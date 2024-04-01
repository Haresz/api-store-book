import { repoGetDetailBook } from "../repository/book.repository";
import { repoFindUserById } from "../repository/user.repository";
import {
  repoAddOrders,
  repoFindOrders,
  repoAddOrderItem,
  repoFindAllOrderItems,
  repoGetDetailOrderItem,
  repoDeleteOrderItem,
  repoFindBookInOrderItem,
  repoUpdateQty,
} from "../repository/order.repository";

export const serviceAddOrderItem = async (request: any) => {
  const { id_user, id_book, qty } = request;
  try {
    if (!request) {
      return {
        status: 401,
        sucsses: false,
        message: "invalid input",
      };
    }
    const dataUser = await repoFindUserById(id_user);
    if (!dataUser) {
      return {
        status: 401,
        sucsses: false,
        message: "invalid user",
      };
    }
    const dataBook = await repoGetDetailBook(id_book);
    if (!dataBook) {
      return {
        status: 401,
        sucsses: false,
        message: "invalid book",
      };
    }
    const findOrders = await repoFindOrders(id_user);
    const findBook = await repoFindBookInOrderItem(id_book);
    if (!findOrders) {
      await repoAddOrders(id_user);
      const findOrders = await repoFindOrders(id_user);
      console.log(findBook);
      if (!findBook) {
        await repoAddOrderItem(
          findOrders?.id_order as number,
          id_book,
          qty,
          dataBook.point * qty
        );
      } else {
        await repoUpdateQty(
          id_book,
          qty + findBook.quantity,
          dataBook.point * qty + findBook.unit_point
        );
      }
    } else {
      if (!findBook) {
        await repoAddOrderItem(
          findOrders?.id_order as number,
          id_book,
          qty,
          dataBook.point * qty
        );
      } else {
        await repoUpdateQty(
          id_book,
          qty + findBook.quantity,
          dataBook.point * qty + findBook.unit_point
        );
      }
    }

    const findAllOrderItems = await repoFindAllOrderItems(id_user);

    return {
      status: 201,
      sucsses: true,
      message: "add order successfully",
      data: findAllOrderItems,
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "server error",
      error: (error as Error).message,
    };
  }
};

export const serviceGetAllOrderItems = async (id_user: string) => {
  try {
    const findAllOrderItems = await repoFindAllOrderItems(id_user);
    if (findAllOrderItems) {
      return {
        status: 200,
        sucsses: true,
        message: "get order items successfully",
        data: findAllOrderItems,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "server error",
      error: (error as Error).message,
    };
  }
};

export const serviceGetDatailOrderItems = async (idorder: any, id: any) => {
  try {
    const detail: any = await repoGetDetailOrderItem(idorder, id);
    return {
      status: 200,
      sucsses: true,
      message: "get order detail items successfully",
      data: { ...detail },
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "server error",
      error: (error as Error).message,
    };
  }
};

export const serviceDeleteOrderItem = async (id: any) => {
  try {
    await repoDeleteOrderItem(id);
    return {
      status: 201,
      sucsses: true,
      message: `get order detail items ${id} successfully`,
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "server error",
      error: (error as Error).message,
    };
  }
};
