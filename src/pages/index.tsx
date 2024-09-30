import Head from "next/head";
import Banner from "../components/Banner/Banner";
import ExploreNearby from "@/components/ExploreNearby/ExploreNearby";
import ScrollCards from "@/components/ScrollCards/ScrollCards";
import CTASection from "@/components/CTASection/CTASection";

type exploreData = {
  img: string;
  location: string;
  distance: string;
};

type Cards_Data = {
  img: string;
  title: string;
};

type Cta_Data = {
  img: string;
  title: string;
  description: string;
  cta_desc: string;
};

export default function Home({
  data,
  cardsData,
  ctaData,
}: {
  data: exploreData[];
  cardsData: Cards_Data[];
  ctaData: Cta_Data;
}) {
  return (
    <>
      <Head>
        <title>Mann&apos;s Airbnb</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Banner />
      <div className={`max-w-6xl mx-auto px-4 md:px-6`}>
        <ExploreNearby data={data} />
        <ScrollCards data={cardsData} />
        <CTASection data={ctaData} />
      </div>
    </>
  );
}

export async function getStaticProps() {
  let data, cardsData, ctaData;
  try {
    const exploreData = await fetch("https://www.jsonkeeper.com/b/SK47");
    data = (await exploreData.json()) || null;

    const scrollCardsData = await fetch("https://www.jsonkeeper.com/b/A3VE");
    cardsData = (await scrollCardsData.json()) || null;

    const ctaSectionData = await fetch("https://www.jsonkeeper.com/b/G731");
    ctaData = (await ctaSectionData.json()) || null;

    if (!ctaSectionData.ok || !scrollCardsData.ok || !exploreData.ok) {
      throw new Error(
        `Response status: ${ctaSectionData.status}, ${scrollCardsData.status}, ${exploreData.status}`
      );
    }
  } catch (e: any) {
    console.error(e.message);
  }
  return {
    props: {
      data,
      cardsData,
      ctaData,
    },
  };
}
