import prisma from "@/app/libs/prismadb";

export interface IwordsParams {
  userId?: string;
  Lang?: string;
}

export default async function getwords(
  params: IwordsParams
) {
  try {
    const {
      userId,
      Lang, 
    } = params;

    let query: any = {};

    if (userId) {
      query.userId = userId;
    }

    if (Lang) {
      query.lang = Lang;
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