import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getWord from "@/app/actions/getWordByWord";
import { toast } from "react-hot-toast";

export async function POST(
  request: Request, 
) {
  const currentUser = await getCurrentUser();
  

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { 
    word,
    Lang,
    Traduction,
   } = body;

  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      NextResponse.error();
    }
  });
  
  //Verify If the word is already existing
  const oldword = await getWord({ userId: currentUser.id,word: body.word });
  let wordTest = false;
  const test = await oldword?.map((item)=>{
    if (item.word === body.word) {
      wordTest = true;
    }
  })

  if (wordTest) {
    return NextResponse.error();
  }

  const listing = await prisma.word.create({
    data: {
        word,
        Lang,
        Traduction,
        userId: currentUser.id
    }
  });

  return NextResponse.json(listing);
}