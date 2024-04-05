import { NextFunction, Request, Response } from "express";
import { jwtHelpers } from "../../helpers/jwtHelper";
import { AppError } from "../errors/AppError";

function auth(...requiredRoles: any[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    let token = req.headers.authorization;

    if (!token) {
      throw new AppError(402, "You are not authorized");
    }

    try {
      const verifiedUser = jwtHelpers.verifyToken(token);

      if (requiredRoles.includes(verifiedUser.role)) {
        req.user = verifiedUser;
        next();
      } else {
        throw new AppError(402, "You are Unauthorized.");
      }
    } catch (error) {
      throw new AppError(402, "Invalid Token!");
    }
  };
}

export default auth;
