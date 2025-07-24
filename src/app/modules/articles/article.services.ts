import { prisma } from "../../../utils/prisma";
import AppError from "../../errors/AppError";

import type { TArticle } from "./article.interface";

const createArticleIntoDB = async (paylaod: TArticle, user: { id: string }) => {
  const insertPayload = {
    ...paylaod,
    authorId: user.id,
  };

  return await prisma.article.create({
    data: insertPayload,
    include: {
      author: {
        select: {
          id: true,
          email: true,
          name: true,
        },
      },
    },
  });
};

//

const getUserArticlesFromDB = async (
  query: Record<string, any>,
  userId: string
) => {
  const { keyWord, tag } = query;

  const filters: any[] = [{ authorId: userId }];

  if (keyWord) {
    filters.push({
      OR: [
        { title: { contains: keyWord as string, mode: "insensitive" } },
        { body: { contains: keyWord as string, mode: "insensitive" } },
      ],
    });
  }

  if (tag) {
    filters.push({
      tags: { has: tag as string },
    });
  }

  const result = await prisma.article.findMany({
    where: {
      AND: filters,
    },
    orderBy: { createdAt: "desc" },
    include: {
      author: {
        select: { id: true, email: true, name: true },
      },
    },
  });

  return result;
};

const deleteArticleFromDb = async (id: string, userId: string) => {
  const article = await prisma.article.findFirst({
    where: { id, authorId: userId },
  });

  if (!article) {
    new AppError(404, "Article Not Found");
  }

  return await prisma.article.delete({ where: { id } });
};

export const articleServices = {
  createArticleIntoDB,
  getUserArticlesFromDB,
  deleteArticleFromDb,
};
