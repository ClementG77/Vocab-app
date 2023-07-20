import Container from "@/app/components/Container";
import EmptyState from "@/app/components/EmptyState";

import getAllwords, { 
  IwordsParams
} from "@/app/actions/getWordById";
import getCurrentUser from "@/app/actions/getCurrentUser";
import ClientOnly from "./components/ClientOnly";

export const dynamic = 'force-dynamic'

interface HomeProps {
  searchParams: IwordsParams
};


const Home = async ({ searchParams }: HomeProps) => {
  const currentUser = await getCurrentUser();
  const words = await getAllwords(searchParams);

  if (words.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Container>
        <div 
          className="
            pt-24
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-8
          "
        >
          {words.map((word: any) => ( 
            <Container
            key={word.id}>
            </Container>
          ))}
        </div>
      </Container>
    </ClientOnly>
  )
}

export default Home;