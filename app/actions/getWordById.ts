import prisma from "@/app/libs/prismadb";
import { SafeUser } from "../types";

export interface IwordsParams {
  userId?: string;
  Lang?: string;
}

export default async function getAllwords(
  params: IwordsParams,
  userParams : SafeUser | null
) {
  try {
    const {
      userId,
      Lang, 
    } = params;

    let query: any = {};

    if (userParams) {
      query.userId = userParams.id;
    }

    if (Lang) {
      query.Lang = Lang;
    }


    const words = await prisma.word.findMany({
      where: query,
      orderBy: {
        createdAt: 'desc'
      }
    });

    const safewords = words.map((word) => ({
      ...word,
      createdAt: word.createdAt.toISOString(),
    }));

    return safewords;
  } catch (error: any) {
    throw new Error(error);
  }
}
