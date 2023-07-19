import prisma from "@/app/libs/prismadb";

export interface IwordsParams {
  userId?: string;
  Lang?: string;
  word?: string;
}

export default async function getWord(
  params: IwordsParams
) {
  try {
    const {
      userId,
      Lang, 
      word,
    } = params;

    let query: any = {};

    if (userId) {
      query.userId = userId;
    }

    if (Lang) {
      query.lang = Lang;
    }
    if (word) {
        query.word = word;
      }


    const words = await prisma.word.findUnique({
      where: query,
    });


    return words;
  } catch (error: any) {
    throw new Error(error);
  }
}
