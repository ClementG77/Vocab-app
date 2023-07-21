import prisma from "@/app/libs/prismadb";

export interface IwordsParams {
  word?: string;
  userId?: string
}

export default async function getWord(
  params: IwordsParams
) {
  try {
    const { word, userId } = params;

    const query: any = {};
        
    if (word) {
      query.word = word;
    };

    if (userId) {
      query.userId = userId;
    };
    const words = await prisma.word.findMany({
      where: {word : query.word ,userId: query.userId},
    });

    if (!words) {
      return null;
    }

    return words;
  } catch (error: any) {
    throw new Error(error);
  }
}
