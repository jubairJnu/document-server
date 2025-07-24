import OpenAI from "openai";
import { prisma } from "../../../utils/prisma";
import AppError from "../../errors/AppError";

import type { TArticle } from "./article.interface";
import config from "../../config";

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
const getUserSingleArticlesFromDB = async (id: string, userId: string) => {
  const result = await prisma.article.findMany({
    where: {
      id,
      authorId: userId,
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

// summery the article

const summarizeArticleFromDB = async (id: string, authorId: string) => {
  const article = await prisma.article.findFirst({
    where: { id, authorId },
  });

  if (!article) {
    throw new AppError(404, "Article Not Found");
  }

  const mockSummary = `This article titled "${article.title}" discusses key concepts and provides insights. The content covers various aspects of the topic with detailed explanations and examples.`;

  let summary: string;

  try {
    const openai = new OpenAI({ apiKey: config.ai_secret });

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "Summarize the following article in 3-4 sentences.",
        },
        {
          role: "user",
          content: `Title: ${article.title}\n\nContent: ${article.body}`,
        },
      ],
      max_tokens: 150,
    });

    summary = response.choices?.[0]?.message?.content || mockSummary;
  } catch (error: any) {
    console.error("OpenAI Error:", error?.message || error);
    summary = mockSummary;
  }

  await prisma.article.update({
    where: { id },
    data: { summary },
  });

  return summary;
};

export const articleServices = {
  createArticleIntoDB,
  getUserArticlesFromDB,
  getUserSingleArticlesFromDB,
  summarizeArticleFromDB,
  deleteArticleFromDb,
};
