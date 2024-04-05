import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../app/config/index";

const createToken = (payload: JwtPayload): any => {
  return jwt.sign(payload, config.secret as string);
};

const verifyToken = (token: string): any => {
  return jwt.verify(token, config.secret as string);
};

export const jwtHelpers = {
  createToken,
  verifyToken,
};
