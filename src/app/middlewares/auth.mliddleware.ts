import { NextFunction, Request, Response } from "express";

import config from "../config";
import { Secret } from "jsonwebtoken";
import { authHelpers } from "../../utils/authHelpter";
import { IAuthenticatedRequest } from "../interface/authInterface";

const auth = (...roles: string[]) => {
  return async (
    req: IAuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const token = req.headers.authorization;
      // console.log(token, "in mid");
      if (!token) {
        throw new Error("You are not authorized");
      }

      const verifyToken = authHelpers.verifyToken(
        token,
        config.jwt_access_secret as Secret
      );

      // ! if not verify

      // ?

      req.user = verifyToken;

      if (roles.length && !roles.includes(verifyToken.role)) {
        throw new Error("Your have not access");
      }

      next();
    } catch (err) {
      console.error("Auth Middleware Error:", err);
      next(err);
    }
  };
};

export default auth;
