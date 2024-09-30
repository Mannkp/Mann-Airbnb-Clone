import { createContext, useState, ReactNode } from "react";

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
  const [searchData, setSearchData] = useState<SearchData | null>({
    location: "",
    range: "",
    noOfGuests: "",
    numberOfDays: 1,
  });

  return (
    <SearchContext.Provider value={{ searchData, setSearchData }}>
      {children}
    </SearchContext.Provider>
  );
};
