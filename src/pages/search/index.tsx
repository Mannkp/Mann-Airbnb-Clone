import Head from "next/head";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import InfoCard from "../../components/InfoCard/InfoCard";
import { differenceInCalendarDays, format } from "date-fns";
import SearchMockData from "../../data/mock_SearchResult.json";
import { SearchContext } from "@/context/SearchContext/SearchContext";
import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  MouseEvent,
  useRef,
} from "react";

const LeafMap = dynamic(
  () => import("../../components/Leaflet Map/LeafletMap"),
  { ssr: false }
);

const searchCategories = {
  Categories: [
    { id: 0, category: "View All" },
    { id: 1, category: "Cancellation Flexibility" },
    { id: 2, category: "Parking included" },
    { id: 3, category: "Economy" },
    { id: 4, category: "with kitchen" },
    { id: 5, category: "Wifi Available" },
  ],
};

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

const SearchPage = ({ searchResult }: { searchResult: searchResults }) => {
  // context to set search data
  const searchContext = useContext(SearchContext);

  const searchParams = useSearchParams();
  const queryLocation = searchParams.get("location") || "";
  const location = decodeURIComponent(queryLocation) || "";
  const startDate = searchParams.get("startDate") || "";
  const endDate = searchParams.get("endDate") || "";
  const noOfGuests = searchParams.get("noOfGuests") || "";
  const [numberOfDays, setNumberOfDays] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [filteredSearch, setFilteredSearch] = useState(searchResult);
  const [selectedMarker, setSelectedMarker] = useState<number>(-1);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  const formattedStartDate =
    (startDate && format(new Date(startDate), "dd MMM yyyy")) || "DD MMM YY";

  const formattedEndDate =
    (endDate && format(new Date(endDate), "dd MMM yyyy")) || "DD MMM YY";

  const range = `${formattedStartDate} - ${formattedEndDate}`;

  // Calculate the difference in days and save all data to context
  useEffect(() => {
    startDate &&
      endDate &&
      setNumberOfDays(
        Math.abs(
          differenceInCalendarDays(new Date(startDate), new Date(endDate))
        )
      );
    if (range !== "" && noOfGuests !== "" && location !== "") {
      searchContext?.setSearchData({
        range,
        noOfGuests,
        location,
        numberOfDays,
      });
    }
  }, [range, noOfGuests, location, numberOfDays]);

  //set state for selected category
  const handleCategory = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    setSelectedCategory(e.currentTarget.value);
  }, []);

  //filter logic
  useEffect(() => {
    if (selectedCategory.toLocaleLowerCase().includes("all")) {
      setFilteredSearch(searchResult);
    } else {
      setFilteredSearch(
        searchResult.filter((item: searchResult) =>
          item?.category?.includes(selectedCategory)
        )
      );
    }
  }, [selectedCategory]);

  // set the index of marker selected (from map)
  const handleSelectedMarker = useCallback((id: number) => {
    setSelectedMarker(id);
  }, []);

  //if marker selected, scroll respective card into center.
  useEffect(() => {
    if (
      selectedMarker !== null &&
      selectedMarker !== undefined &&
      cardRefs.current[selectedMarker]
    ) {
      cardRefs?.current[selectedMarker]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [selectedMarker]);

  return (
    <>
      <Head>
        <title>Search Mann&apos;s Airbnb</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section
        aria-label="search section"
        className={
          "max-w-6xl mx-auto px-4 md:px-6 py-12 lg:py-20 flex gap-2 xl:gap-4 flex-col lg:flex-row"
        }
      >
        {/* Search Page Logic, if searched item not present */}
        {location && !location.toLowerCase().includes("london") && (
          <>
            <div className="min-w-full">
              <h2 className="text-xl lg:text-2xl text-red-400 text-center">
                Oops.. It seems no rooms available here in "{location}"!
              </h2>
              <h3 className="text-lg text-center py-8 font-medium ">
                Dont worry, we got amazing rooms in london, so try searching for
                "London" &#128519;
              </h3>
            </div>
          </>
        )}

        {/* if searched location is london (as per static data we have) */}
        {location && location.toLowerCase().includes("london") && (
          <>
            <div className="searchContent min-w-[70%]">
              <p className={`text-xs`}>
                300+ Stays for {noOfGuests} guests
                {formattedStartDate === formattedEndDate
                  ? " on " + formattedStartDate
                  : " between " + range}
              </p>
              <h1 className="text-3xl font-semibold mt-2 mb-6">
                Stays in {location}
              </h1>
              <div className="flex flex-wrap gap-x-4 gap-y-2 mb-5 text-gray-800">
                {/* category buttons and filters */}
                {searchCategories &&
                  searchCategories?.Categories?.map(
                    (item: { id: number; category: string }, index: number) => {
                      return (
                        <button
                          className="categoryFilter"
                          value={item?.category}
                          key={index + item?.id + item?.category}
                          onClick={handleCategory}
                        >
                          {item?.category}
                        </button>
                      );
                    }
                  )}
              </div>
              <p className="mx-2 my-4">
                {filteredSearch.length} Search Results
              </p>
              <div className="infoCards flex flex-col max-w-full">
                {/* display cards based on selected Filters */}
                {searchResult &&
                  filteredSearch &&
                  filteredSearch?.map((item: searchResult, index: number) => {
                    return (
                      <Link
                        href={`/search/${encodeURIComponent(item?.title)}`}
                        key={index + item?.star + item?.title}
                      >
                        <div
                          ref={(el) => {
                            cardRefs.current[index] = el;
                          }}
                        >
                          <InfoCard data={item} />
                        </div>
                      </Link>
                    );
                  })}
              </div>
            </div>
            <aside className="min-w-full lg:min-w-[30%]  flex">
              <div className="leafletMaps flex-grow flex">
                {searchResult && filteredSearch && (
                  <LeafMap
                    data={filteredSearch}
                    onSelect={handleSelectedMarker}
                  />
                )}
              </div>
            </aside>
          </>
        )}
      </section>
    </>
  );
};

export default SearchPage;

export const getServerSideProps = () => {
  const searchResult: searchResults = SearchMockData;
  return {
    props: {
      searchResult,
    },
  };
};
