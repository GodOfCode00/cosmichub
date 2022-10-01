import { CoreContext } from "@theinternetfolks/context";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { IUser } from "../interfaces/user";
import PlatformError from "../universe/errors/PlatformError";

export default function authHandler(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const key = process.env.TOKEN_KEY;
  if (!key) throw new PlatformError(500, ["Environment Var not found"]);
  const token =
    request.cookies.token ||
    request.query.token ||
    request.headers["x-access-token"];
    
  if (!token)
    throw new PlatformError(403, ["Forbidden access", "Authorized Token not"]);

  const user: IUser = verify(token, key) as IUser;
  CoreContext.set({ user });
  next();
}
