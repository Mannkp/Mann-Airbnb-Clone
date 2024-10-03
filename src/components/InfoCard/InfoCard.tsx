import Image from "next/image";
import { useRef, useContext } from "react";
import { searchResult } from "@/pages/search";
import { FaRegHeart, FaStar } from "react-icons/fa6";
import { SearchContext } from "@/context/SearchContext/SearchContext";

const InfoCard = ({ data }: { data: searchResult }) => {
  const searchContent = useContext(SearchContext);

  const CalculatedTotal = useRef<number | null>(null);
  CalculatedTotal.current =
    ((searchContent?.searchData?.numberOfDays &&
      searchContent?.searchData?.numberOfDays) ||
      1) * ((data?.price && parseInt(data?.price)) || 1);

  return (
    // <div className="max-w-sm rounded overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 my-4">
    //   <img
    //     className="w-full h-48 md:h-64 lg:h-80 object-cover"
    //     src={data?.img}
    //     alt="Card Image"
    //   />
    //   <div className="px-6 py-4">
    //     <div className="font-bold text-xl md:text-2xl lg:text-3xl mb-2">
    //       Card Title
    //     </div>
    //     <p className="text-gray-700 text-base md:text-lg lg:text-xl">
    //       Card content goes here. This is a brief description or summary.
    //     </p>
    //   </div>
    //   <div className="px-6 pt-4 pb-2">
    //     <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
    //       #tag1
    //     </span>
    //     <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
    //       #tag2
    //     </span>
    //     <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
    //       #tag3
    //     </span>
    //   </div>
    // </div>
    // <div>
    <div className="flex flex-col sm:flex-row px-4 py-7 shadow-md hover:shadow-xl transition duration-200 first:border-t gap-4">
      <div className="relative min-h-44 sm:min-h-24 sm:max-w-40 md:min-h-52 md:max-w-80 w-full flex-shrink-0 rounded-xl overflow-hidden">
        <Image
          src={data?.img}
          alt={data?.title}
          fill
          className="object-cover"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRm knyJckliyjqTzSlT54b6bk+h0R//2Q=="
        />
      </div>
      <div className="flex-grow flex flex-col">
        <div className="flex justify-between">
          <p className="text-sm">{data?.location}</p>
          <FaRegHeart className="cursor-pointer text-xl md:text-lg mr-1" />
        </div>
        <h3 className="text-xl font-semibold leading-6 mt-2 mb-4">
          {data?.title}
        </h3>
        <p className="text-sm leading-6 text-gray-500 flex-grow">
          {data?.description}
        </p>
        <div className="mt-4 flex flex-col sm:flex-row items-start md:items-center justify-between gap-2 md:gap-0">
          <div className="flex items-center gap-1">
            <FaStar className="text-orange-400" />
            <p>{data?.star}</p>
          </div>
          <div className="pr-4 flex sm:flex-col items-center sm:items-end justify-between w-full">
            <p className="text-md md:text-lg font-bold">
              {"£" + data?.price + " / night" || "£703 total"}
            </p>
            <p className="text-sm md:text-md">
              {CalculatedTotal.current !== 1
                ? `£${CalculatedTotal.current} total`
                : data?.total}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
