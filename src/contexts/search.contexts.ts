import {createContext} from "react";

export const SearchContext = createContext({
    search: 'wyszukaj',
    setSearch: (s: string) => {},
})