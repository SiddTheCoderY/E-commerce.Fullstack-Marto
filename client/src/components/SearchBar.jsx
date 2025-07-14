// components/SearchBar.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SlidersHorizontal, Search } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import SearchFilter from "./SearchFilter";
import { setSearchFilter } from "../features/localState/localStateSlice";

const SearchBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);
  const { searchFilter } = useSelector((state) => state.localState);

  const [isSearchFilterOpen, setIsSearchFilterOpen] = useState(false);

  const handleProductSearch = (searchTerm) => {
    if (!isAuthenticated) {
      toast.error("Please login to search products");
      return;
    }

    if (searchTerm.trim() !== "") {
      const queryParams = new URLSearchParams({
        searchQuery: searchTerm,
        category: searchFilter.category,
        price: searchFilter.price,
        rating: searchFilter.rating,
        brand: searchFilter.brand,
        sortBy: searchFilter.sortBy,
        page: searchFilter.page,
        itemsPerPage: searchFilter.itemsPerPage,
      }).toString();

      navigate(`/search?${queryParams}`);
    } else {
      toast.error("Please enter a search term");
    }
  };

  return (
    <div className="flex items-center relative w-96 max-w-xl mx-4">
      <input
        value={searchFilter.searchQuery}
        onChange={(e) =>
          dispatch(setSearchFilter({ searchQuery: e.target.value }))
        }
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleProductSearch(e.target.value);
            e.preventDefault();
          }
        }}
        type="text"
        placeholder="Search..."
        className="border border-gray-300 rounded-md px-1 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full h-10 pl-4 pr-18 text-sm relative"
      />
      <SlidersHorizontal
        onClick={() => setIsSearchFilterOpen((prev) => !prev)}
        width={20}
        className="cursor-pointer hover:scale-110 text-gray-500 mr-2 absolute right-10 top-1/2 transform -translate-y-1/2"
      />
      <Search
        width={20}
        onClick={() => handleProductSearch(searchFilter.searchQuery)}
        className="cursor-pointer text-gray-500 mr-2 absolute right-0 hover:scale-110"
      />
      <AnimatePresence>
        {isSearchFilterOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/30 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSearchFilterOpen(false)}
            />
            <div className="absolute top-12 left-0 w-[150%] z-50 min-h-[200px]">
              <SearchFilter onClose={() => setIsSearchFilterOpen(false)} />
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;
