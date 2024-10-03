import Head from "next/head";
import { useState, useEffect, useContext } from "react";
import { GetStaticPaths } from "next";
import { FaStar } from "react-icons/fa6";
import SearchMockData from "../../../data/mock_SearchResult.json";
import { SearchContext } from "@/context/SearchContext/SearchContext";
import ThumbnailCarousel from "@/components/ThumbnailCarousel/ThumbnailCarousel";

export type searchResult = {
  img: string;
  location: string;
  title: string;
  description: string;
  star: number;
  price: string;
  total: string;
  category: string[];
  long: number;
  lat: number;
};

type searchResults = searchResult[];

const roomPage = ({ searchResult: data }: { searchResult: searchResult }) => {
  const searchContent = useContext(SearchContext);
  const [calculatedTotal, setCalculatedTotal] = useState<number | null>(null);

  useEffect(() => {
    if (
      searchContent?.searchData?.numberOfDays &&
      data?.price &&
      !isNaN(parseInt(data.price))
    ) {
      const total =
        searchContent.searchData.numberOfDays * parseInt(data.price);
      setCalculatedTotal(total);
    } else {
      setCalculatedTotal(null); // Reset if any value is missing or invalid
    }
  }, [searchContent, data]);

  return (
    <>
      <section className="roomDetail max-w-6xl mx-auto px-4 md:px-6 py-12 lg:py-20 ">
        <div className={""}>
          <Head>
            <title>{data?.title}</title>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <h2 className="text-4xl 2xl:text-5xl font-semibold pb-8 md:pb-16 text-center font-mono text-red-400">
            {data?.title}
          </h2>

          <div
            className={"flex flex-col md:flex-row gap-4 lg:gap-8 items-stretch"}
          >
            <div className={"thumbnail min-h-[450px] min-w-[250px]"}>
              <ThumbnailCarousel data={data} />
            </div>
            <div className="content flex-grow">
              <div className="categories pb-4">
                <p className="text-xl text-red-400 pb-2">Categories:</p>
                <ul className="list-none flex gap-2 flex-wrap">
                  {data?.category?.map((item: string, index: number) => (
                    <li key={index} className="px-2">
                      &rarr;{item || "category here"}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="description pb-4">
                <p className="text-xl text-red-400 pb-2">
                  Description / Room Features:
                </p>
                <p className="leading-6 px-2">
                  {data?.description || "description here"}
                </p>
              </div>
              <div className="location pb-4">
                <p className="text-xl text-red-400 pb-2">Stay location:</p>
                <p className="leading-6 px-2">
                  {data?.location || "location here"}
                </p>
              </div>
              <div className="Ratings pb-4">
                <p className="text-xl text-red-400 pb-2">Room Ratings:</p>
                <p className="leading-6 flex items-center gap-2 px-2">
                  {data?.star || "Ratings here"}
                  <FaStar className="text-orange-400" />
                </p>
              </div>
              <div className="Price pb-4">
                <p className="text-xl text-red-400 pb-2">Pricing:</p>
                <p className="leading-6 flex items-center gap-2 px-2">
                  £{data?.price || "Price here"}
                </p>
                <p className="leading-6 flex items-center gap-2 px-2">
                  {calculatedTotal !== 1
                    ? `£${calculatedTotal} Total for ${
                        searchContent?.searchData?.noOfGuests || 1
                      } guests staying for ${
                        searchContent?.searchData?.numberOfDays
                      } days.`
                    : data?.total}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default roomPage;

export const getStaticPaths: GetStaticPaths = () => {
  const searchResult: searchResults = SearchMockData;
  const paths = searchResult?.map((item) => ({
    params: {
      title: item?.title,
    },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = ({ params }: { params: { title: string } }) => {
  if (!params || !params.title) {
    return {
      notFound: true,
    };
  }
  const searchResult: searchResults = SearchMockData?.filter(
    (item: searchResult) =>
      item?.title?.toLowerCase() === params?.title?.toLowerCase()
  );
  return {
    props: {
      searchResult: searchResult[0],
    },
    revalidate: 3600,
  };
};
