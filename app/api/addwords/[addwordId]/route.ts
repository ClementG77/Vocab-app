import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
  wordId?: string;
}

export async function DELETE(
  request: Request, 
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { wordId } = params;

  if (!wordId || typeof wordId !== 'string') {
    throw new Error('Invalid ID');
  }

  const word = await prisma.word.deleteMany({
    where: {
      id: wordId,
      userId: currentUser.id
    }
  });

  return NextResponse.json(word);
}