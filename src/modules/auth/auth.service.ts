import bcrypt from "bcrypt";
import type { Secret } from "jsonwebtoken";
import config from "../../config";
import AppError from "../../errors/AppError";
import { authHelpers } from "../../utils/authHelpter";

import { prisma } from "../../utils/prisma";
import type { TAuthUser } from "./auth.inerface";

const signUpUserIntoDB = async (paylaod: TAuthUser) => {
  const { email, password, name } = paylaod;

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    new AppError(400, "User already exists ");
  }

  // Hash password and create user
  const hashedPassword = await authHelpers.hashPassword(password);

  return await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name: name || null,
    },
    select: {
      id: true,
      email: true,
      name: true,
    },
  });
};

const loginUserInToDB = async (payload: any) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
    },
  });

  const isCorrectPassword = await bcrypt.compare(
    payload.password,
    userData.password
  );

  if (!isCorrectPassword) {
    throw new AppError(400, "Password Is Incorrect");
  }

  const jwtPaload = {
    email: userData.email,
    role: userData.role,
    id: userData.email,
  };

  //access token
  const accessToken = authHelpers.generateToken(
    jwtPaload,
    config.jwt_access_secret as Secret,
    config.jwt_expires_in as string
  );
  //   refresh token
  const refreshToken = authHelpers.generateToken(
    jwtPaload,
    config.jwt_refresh_secret as Secret,
    config.jwt_refresh_expires_in as string
  );

  return {
    needPasswordChange: userData.needPasswordChange,
    accessToken,
    refreshToken,
  };
};

//  export

export const authServices = {
  signUpUserIntoDB,
  loginUserInToDB,
};
