import Image from "next/image";
import Link from "next/link";
import {
  FormEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
  useContext,
  useCallback,
} from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { addDays } from "date-fns";
import { IoSearchOutline, IoGlobeOutline } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaUserCircle, FaUserFriends } from "react-icons/fa";
import { useRouter } from "next/router";
import { SearchContext } from "@/context/SearchContext/SearchContext";

const HeaderJson = {
  desk_image:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/2560px-Airbnb_Logo_B%C3%A9lo.svg.png",
  mobile_image: "/airbnb2.png",
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");
  const [isSearchMenuOpen, setIsSearchMenuOpen] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [noOfGuests, setNoOfGuests] = useState<number>(1);
  const searchContext = useContext(SearchContext);
  const router = useRouter();
  const searchMenuRef = useRef<HTMLInputElement>(null);

  // for Date-Range-Picker
  const selectionRange = useMemo(
    () => ({
      startDate,
      endDate,
      key: "selection",
    }),
    [startDate, endDate]
  );

  //setting dates from Date-Range-Picker
  const handleSelect = (ranges: any) => {
    setStartDate(ranges?.selection?.startDate);
    if (ranges?.selection?.startDate == ranges?.selection?.endDate) {
      setEndDate(addDays(ranges?.selection?.endDate, 1));
    } else {
      setEndDate(ranges?.selection?.endDate);
    }
  };

  //reset input when click clear button in mega menu/ date-range-picker
  const resetInput = useCallback(() => {
    setSearchInput("");
    setNoOfGuests(1);
    setStartDate(new Date());
    setEndDate(new Date());
  }, []);

  //handle mega menu submit
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push({
      pathname: "/search",
      query: {
        location: searchInput,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        noOfGuests,
      },
    });
    setIsSearchMenuOpen(false); // Close the search menu after submission
    setSearchInput(""); //clear search input after submission
  };

  //dont allow scrolling on mobile viewpoint
  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", isSearchMenuOpen);
    document.body.classList.toggle("md:overflow-auto", isSearchMenuOpen);

    return () => {
      document.body.classList.remove("overflow-hidden");
      document.body.classList.remove("md:overflow-auto");
    };
  }, [isSearchMenuOpen]);

  //disable mega-menu/date-range-picker if clicked outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!searchMenuRef?.current?.contains(e.target as Node)) {
        setIsSearchMenuOpen(false);
      } else if (searchMenuRef?.current?.contains(e.target as Node)) {
        setIsSearchMenuOpen(true);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  //dont open mega-menu/date-range-picker if input has only white spaces
  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      setIsSearchMenuOpen(searchInput.trim().length > 0);
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [searchInput]);

  //clear context when leaving search page
  useEffect(() => {
    const handleRouteChange = () => {
      if (router.pathname !== "/search") {
        searchContext?.setSearchData({
          location: "",
          range: "",
          noOfGuests: "",
          numberOfDays: 1,
        });
      }
      setIsMenuOpen(false);
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.pathname, searchContext]);

  //for search input placeholder -> receiving from search page to sync the data on both places!
  const searchInputPlaceholder = useMemo(
    () =>
      searchContext?.searchData?.location !== "" &&
      searchContext?.searchData?.range !== "" &&
      searchContext?.searchData?.noOfGuests !== ""
        ? `${searchContext?.searchData?.location} | ${searchContext?.searchData?.range} | ${searchContext?.searchData?.noOfGuests} guests`
        : "",
    [searchContext?.searchData]
  );

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md px-3 md:px-7 w-full min-w-[350px]">
      <div className="flex items-center md:items-stretch justify-between flex-wrap md:flex-nowrap">
        <div className="relative w-max md:w-full py-5 flex items-center">
          <Link href={"/"} className="" aria-label="Link to home page">
            <Image
              src={HeaderJson?.mobile_image}
              className="inline-block md:hidden"
              alt="Airbnb logo"
              height={36}
              width={36}
            />
            <Image
              src={HeaderJson?.desk_image}
              className="hidden md:block"
              alt="Airbnb logo"
              height={46}
              width={120}
            />
          </Link>
        </div>
        <div
          ref={searchMenuRef}
          className={`searchSection w-full md:block py-4 2xl:py-5 ${
            isMenuOpen ? "block order-last md:order-none" : "hidden"
          }`}
        >
          <div className=" border-2 rounded-full px-2">
            <form
              className="flex items-center justify-between"
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                placeholder={searchInputPlaceholder || "Start your search"}
                className="flex-grow outline-none rounded-full px-2 py-2 2xl:px-4 w-1/2 md:w-full "
                value={searchInput}
                onChange={(e) => {
                  setSearchInput(e.target.value);
                }}
              />
              <span
                className={`px-4 py-1 text-md font-semibold border-2 rounded-full bg-gray-500 text-white md:hidden transition duration-150 ease-in-out ${
                  isSearchMenuOpen
                    ? searchInput !== ""
                      ? " rotate-180 !bg-red-400 "
                      : ""
                    : " "
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  if (isSearchMenuOpen && searchInput !== "") {
                    setIsSearchMenuOpen(false);
                  }
                  if (!isSearchMenuOpen && searchInput !== "") {
                    setIsSearchMenuOpen(true);
                  }
                }}
              >
                &or;
              </span>
              <button type="submit" aria-label="Search">
                <IoSearchOutline className="hidden md:block text-4xl bg-red-400 rounded-full text-white md:p-1 cursor-pointer text-center md:my-2" />
              </button>
            </form>
          </div>

          {/* Date-Range-Picker  -> to be made visible when search is active*/}
          {searchInput?.trim() && isSearchMenuOpen && (
            <div
              className={`megaMenu fixed overflow-hidden overflow-y-auto
                 w-full top-[13rem] left-0 right-0 bottom-0 px-4 pt-8 pb-14 md:px-8 md:pt-2 md:pb-4 2xl:py-8 bg-white md:absolute md:top-full md:right-auto md:bottom-auto md:shadow-lg md:shadow-black md:max-h-[80vh] scrollbar-hide `}
            >
              <div className="flex flex-col items-center justify-center w-max mx-auto ">
                <DateRangePicker
                  ranges={[selectionRange]}
                  minDate={new Date()}
                  rangeColors={["#FD5B61"]}
                  onChange={handleSelect}
                  className="font-semibold flex flex-col-reverse items-center justify-center md:items-stretch md:flex-row "
                />
                <div className="w-full flex items-center border-b my-4">
                  <h2 className={`text-2xl flex-grow font-semibold`}>
                    Number of Guests
                  </h2>
                  <FaUserFriends className="text-xl" />
                  <input
                    type="number"
                    value={noOfGuests}
                    onChange={(e) => {
                      setNoOfGuests(parseInt(e.target.value));
                    }}
                    min={1}
                    className="w-14 pl-2 text-lg outline-none text-red-400"
                  />
                </div>
                <div className="flex w-full border items-stretch justify-between">
                  <button
                    type="reset"
                    onClick={resetInput}
                    className="text-gray-500 py-2 px-4 hover:bg-gray-100 transition duration-150 ease-in-out basis-1/2 border"
                  >
                    Cancel
                  </button>
                  <form
                    onSubmit={handleSubmit}
                    className="flex-grow text-red-400 py-2 px-4 hover:bg-gray-100 transition duration-150 ease-in-out basis-1/2 border"
                  >
                    <button type="submit" className="min-w-full">
                      Search
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center justify-end space-x-4 md:w-full w-max">
          <div className="group h-full flex items-center">
            <Link href={"#"} className="hidden lg:block">
              Extra Information
            </Link>
            <div className="hidden group-hover:block absolute top-full bg-yellow-50 px-4 py-8 w-full left-0 transition-all duration-150">
              <p>Please search 'london' to explore real search page!</p>
              <p>
                Please note, Total Cost is calculated on 'Days to stay' * 'Cost
                per night'
              </p>
              <p>Explore other projects by us!</p>
            </div>
          </div>
          <Link href={"#"} aria-label="Language Picker">
            <IoGlobeOutline className="text-2xl" />
          </Link>
          <div className="flex text-2xl items-center gap-2 justify-evenly border-2 rounded-full px-2 py-1 lg:p-2 hover:shadow-md transition duration-150">
            <div
              onClick={() => {
                isMenuOpen ? setIsMenuOpen(false) : setIsMenuOpen(true);
              }}
              aria-label="menu"
            >
              <RxHamburgerMenu
                className={
                  (isMenuOpen ? " rotate-90 " : " rotate-180 ") +
                  " transition-all duration-300 ease-in-out "
                }
              />
            </div>
            <Link href={"#"}>
              <FaUserCircle />
            </Link>
          </div>
        </div>
        <div
          className={`miniMenu w-full md:w-0 ${
            isMenuOpen ? "block" : "hidden"
          }`}
        >
          <ul
            className={`flex flex-row gap-4 items-center justify-between md:justify-end md:absolute md:top-full md:left-auto md:w-max md:right-0 bg-white px-2 md:rounded-s-lg md:py-4 md:px-6`}
          >
            <li className="px-2 py-3 border-2 rounded-xl">
              <Link href={"/about"}>About Site</Link>
            </li>
            <li className="px-2 py-3 border-2 rounded-xl">
              <Link href={"/contact"}>Contact Us</Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
