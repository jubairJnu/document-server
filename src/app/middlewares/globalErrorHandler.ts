import { NextFunction, Request, Response } from "express";


const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // console.log(err,"in global")
  res.status(500).json({
    success: false,
    message: err?.message || "Something went wrong",
    error: err,
  });
  next();
};

export default globalErrorHandler;
