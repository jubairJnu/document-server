import type { Response } from "express";

type TSendResponse<T> = {
  success: boolean;
  statusCode: number;
  message?: string;
  data: T | undefined | null;
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
};

const sendResponse = <T>(res: Response, jsonData: TSendResponse<T>) => {
  res.status(jsonData.statusCode).json({
    success: jsonData.success,
    statusCode: jsonData.statusCode,
    message: jsonData?.message,
    meta: jsonData?.meta,
    data: jsonData.data,
  });
};

export default sendResponse;
