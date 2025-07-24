import { NextFunction, Request, Response } from "express";


const notFoundApi = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: "Api Not Found!",
    error: {
      path: req.originalUrl,
      message: "Not Found your request",
    },
  });
};

export default notFoundApi;
