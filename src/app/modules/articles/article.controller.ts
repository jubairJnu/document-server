import { Request, Response } from "express";
import catchAsync from "../../../utils/CatchAsync";
import { IAuthenticatedRequest } from "../../interface/authInterface";
import { articleServices } from "./article.services";
import sendResponse from "../../../utils/SendResponse";

const creaArticles = catchAsync(
  async (req: IAuthenticatedRequest, res: Response) => {
    const result = await articleServices.createArticleIntoDB(
      req.body,
      req.user
    );
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Article Created Successfully",
      data: result,
    });
  }
);

const getUserArticle = catchAsync(
  async (req: IAuthenticatedRequest, res: Response) => {
    const result = await articleServices.getUserArticlesFromDB(
      req.query,
      req.user?.id
    );
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Article Retrived Successfully",
      data: result,
    });
  }
);

const summaryArticle = catchAsync(
  async (req: IAuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    const result = await articleServices.summarizeArticleFromDB(
      id,
      req.user?.id
    );
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Article Summarize Successfully",
      data: result,
    });
  }
);
const deleteArticles = catchAsync(
  async (req: IAuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    const result = await articleServices.deleteArticleFromDb(id, req.user?.id);
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Article deleted Successfully",
      data: result,
    });
  }
);

export const articleController = {
  creaArticles,
  getUserArticle,
  summaryArticle,
  deleteArticles,
};
