"use client";

import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";

export interface SearchData {
  location: string | null;
  range: string | null;
  noOfGuests: string | null;
  numberOfDays: number | null;
}

export interface SearchContextProps {
  searchData: SearchData | null;
  setSearchData: (data: SearchData) => void;
}

//context to send search data to header for input placeholder
export const SearchContext = createContext<SearchContextProps | null>(null);

// Search context provider component
export const SearchProvider = ({ children }: { children: ReactNode }) => {
  //set data in context, if reading from session or null if fresh
  const [searchData, setSearchData] = useState<SearchData | null>(null);

  useEffect(() => {
    const currentSearchData = sessionStorage.getItem("searchData");
    currentSearchData
      ? setSearchData(JSON.parse(currentSearchData))
      : {
          location: "",
          range: "",
          noOfGuests: "",
          numberOfDays: 1,
        };
  }, []);

  //if search data changes, set it to session storage
  useEffect(() => {
    sessionStorage.setItem("searchData", JSON.stringify(searchData));
  }, [searchData]);

  return (
    <SearchContext.Provider value={{ searchData, setSearchData }}>
      {children}
    </SearchContext.Provider>
  );
};

// Session storage logic: session lasts till the tab is open, once tab is closed, session ends
// so initially, session must be empty so getInitialState function will return object with empty values, now when user searches, state will be updated and same will be stored in session, so if user refreshes tab, session will persist and data will be retained! voila..
