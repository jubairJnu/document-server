import bcrypt from "bcrypt";

import jwt, {
  type JwtPayload,
  type Secret,
  type SignOptions,
} from "jsonwebtoken";

export interface AuthUser {
  id: string;
  email: string;
  name?: string;
}

const generateToken = (payload: any, secret: Secret, expiresIn: string) => {
  return jwt.sign(payload, secret, { expiresIn } as SignOptions);
};

const verifyToken = (token: string, sercet: Secret) => {
  return jwt.verify(token, sercet) as JwtPayload;
};

export const jwtHelpers = {
  generateToken,
  verifyToken,
};

const hashPassword = (password: string): Promise<string> => {
  return bcrypt.hash(password, 12);
};

export const authHelpers = {
  hashPassword,
  generateToken,
  verifyToken,
};
