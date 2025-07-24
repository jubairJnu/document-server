import type { Request, Response } from "express";
import catchAsync from "../../utils/CatchAsync";
import { authServices } from "./auth.service";
import config from "../../config";
import sendResponse from "../../utils/SendResponse";

const signUpUser = catchAsync(async (req: Request, res: Response) => {
  const result = await authServices.signUpUserIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "SignUp Successfully",
    data: result,
  });
});
const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await authServices.loginUserInToDB(req.body);

  const { refreshToken, accessToken, needPasswordChange } = result;

  res.cookie("refreshToken", refreshToken, {
    secure: config.node_env == "developemnt" ? false : true,
    httpOnly: true,
  });

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Login Successfully",
    data: {
      accessToken,
      needPasswordChange,
    },
  });
});

// export
export const authController = {
  signUpUser,
  loginUser,
};
