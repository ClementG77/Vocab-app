import Container from "@/app/components/Container";
import EmptyState from "@/app/components/EmptyState";

import getAllwords, { 
  IwordsParams
} from "@/app/actions/getWordById";
import getCurrentUser from "@/app/actions/getCurrentUser";
import ClientOnly from "./components/ClientOnly";
import Quizz from "./components/quizz/Quizz";
import { SafeWord } from "./types";

export const dynamic = 'force-dynamic'

interface HomeProps {
  searchParams: IwordsParams
};


const Home = async ({ searchParams }: HomeProps) => {
  const currentUser = await getCurrentUser();
  const words = await getAllwords(searchParams);
  const rand = (Math.floor(Math.random() * words.length));



  if (words.length === 0) {
    return (
      <ClientOnly>
        <EmptyState 
        title="No exact matches"
        subtitle=""
        showReset />
      </ClientOnly>
    );
  }
  if (searchParams.Lang === undefined) {
    return (
      <ClientOnly>
        <EmptyState 
        title="Please pick a language above"
         />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Container>
        <div 
          className="
          pt-24
          flex  
          items-center
          justify-center
          gap-8 
          "
        >
            <Quizz
            currentUser={currentUser}
            key={1}
            testWord={words[rand].word}
            correctTraduction={words[rand].Traduction}/>

        </div>
      </Container>
    </ClientOnly>
  )
}

export default Home;