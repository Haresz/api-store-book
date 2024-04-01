import { repoAddBook, repoGetAllBooks } from "../repository/book.repository";

export const serviceAddBook = async (req: any) => {
  try {
    console.log(req);
    if (!req) {
      throw new Error("Invalid request");
    }
    repoAddBook(req);
    return {
      status: 201,
      success: true,
      message: "Add data success",
      data: req,
    };
  } catch (error) {
    throw new Error("Failed to add book");
  }
};

export const serviceGetALLBooks = async () => {
  try {
    const data = await repoGetAllBooks();
    console.log(data);
    return {
      status: 200,
      success: true,
      message: "Get data success",
      data: data,
    };
  } catch (error) {
    throw new Error("Failed to get books");
  }
};
