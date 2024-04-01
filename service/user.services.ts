import {
  repoGetPoint,
  repoUserUpdatePoint,
} from "./../repository/user.repository";
import { genSalt, hash, compare } from "bcrypt";
import {
  repoAddPoint,
  repoAddUser,
  repoFindUser,
} from "../repository/user.repository";
import { sign, verify } from "jsonwebtoken";

export const serviceRegister = async (request: User) => {
  try {
    const existingUser: any = await repoFindUser(request.email);

    if (existingUser) {
      return {
        status: 401,
        sucsses: false,
        message: "email already registered",
      };
    }

    const salt = await genSalt(10);
    const hashedPassword = await hash(request.password, salt);
    console.log(hashedPassword, "password-reg");
    await repoAddUser(
      request.username,
      request.email,
      hashedPassword,
      request.address
    );

    const findUser = await repoFindUser(request.email);
    if (findUser) {
      await repoAddPoint(findUser.id_user);
      const findPoint = await repoGetPoint(findUser.id_user);
      if (findPoint) {
        await repoUserUpdatePoint(findPoint.id_point, findPoint.id_user);
      }
    }

    return {
      status: 201,
      sucsses: true,
      message: "register successfully",
      data: request,
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

export const serviceLogin = async (request: any) => {
  const { email, password }: { email: string; password: string } = request;
  try {
    const existingUser: any = await repoFindUser(email);

    if (!existingUser) {
      return {
        status: 401,
        sucsses: false,
        message: "invalid email or password",
      };
    }

    const isValidPassword = await compare(password, existingUser.password);

    if (!isValidPassword) {
      return {
        status: 401,
        sucsses: false,
        message: "invalid password",
      };
    }

    const jwtPayload = { email };
    const token = sign(jwtPayload, `keyOFkey`, { expiresIn: "1h" });

    delete existingUser.password;
    return {
      status: 201,
      sucsses: true,
      message: "login successfully",
      data: existingUser,
      token: token,
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

export const serviceVerifyToken = async (request: any, next: any) => {
  try {
    const token = request.header("Authorization")?.replace("Bearer", "");

    if (!token) {
      return {
        status: 401,
        message: "invalid token, unauthorized",
      };
    }

    const verifiedUser = verify(token, "keyOFkey");
    if (!verifiedUser) {
      return {
        status: 401,
        message: "expired token",
      };
    }

    request.user = verifiedUser as User;

    next();
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "Register Error",
      error: (error as Error).message,
    };
  }
};

interface User {
  username: string;
  email: string;
  password: string;
  address: string;
}
