import prisma from "@/app/libs/prismadb";

export interface IwordsParams {
  word?: string;
  userId?: string;
  Lang?: string;
}

export default async function getWord(
  params: IwordsParams
) {
  try {
    const { word, userId, Lang } = params;

    const query: any = {};
        
    if (word) {
      query.word = word;
    };

    if (userId) {
      query.userId = userId;
    };
    if (Lang) {
      query.Lang = Lang;
    };

    const words = await prisma.word.findMany({
      where: {word : query.word,
              userId: query.userId,
              Lang:query.Lang},
    });

    if (!words) {
      return null;
    }

    return words[0];
  } catch (error: any) {
    throw new Error(error);
  }
}
