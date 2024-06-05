"use client"
import SearchSuggestion from "@/components/SearchSuggestion";
import { FaSearch } from "react-icons/fa";
import { use, useEffect, useState } from "react";
import { getDetailsPlaceid } from "@/controllers/getDetailsPlaceid";

const SearchPage = () => {
  const [search, setSearch] = useState<String>("")
  const [searchResult, setSearchResult] = useState<any[]>([])

  const getSearchResult = async () => {
    setSearchResult(await getDetailsPlaceid(search))
  }

  useEffect(() => {
    getSearchResult()
  }, [search])

  return (
    <div className="px-2 sm:px-8 md:px-16 lg:px-32 py-8 flex flex-col justify-start items-center min-h-screen">
      <form className="w-full max-w-xl mx-auto flex items-center bg-slate-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md shadow-md">
      <input
        type="text"
        placeholder="Buscar ciudad"
        value={search.toString()}
        onChange={(e) => setSearch(e.target.value)}
        className="flex-grow p-3 bg-transparent text-gray-900 dark:text-gray-50 focus:outline-none rounded-l-md"
      />
      <button type="submit" className="p-3 bg-gray-800 dark:bg-slate-200 text-slate-50 dark:text-gray-900 rounded-r-md hover:bg-gray-700 dark:hover:bg-slate-300 transition-all duration-200 flex items-center justify-center">
        <FaSearch />
      </button>
    </form>

    {(search !== "")?
      <SearchSuggestion
        info = {searchResult}
        search = {search.toString()}
      /> 
      : null} 
    </div>
  );
};

export default SearchPage;





